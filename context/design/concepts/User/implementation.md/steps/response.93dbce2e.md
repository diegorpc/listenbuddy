---
timestamp: 'Sat Oct 18 2025 23:04:12 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251018_230412.88d9fae5.md]]'
content_id: 93dbce2e0211c1c51be6ff3ea60f400f98d2e819246debc56c68b7a3c92dd7a5
---

# response:

Here's the TypeScript implementation for the `User` concept, following the provided guidelines and addressing the nuance of `associateToken` for concept independence.

The `associateToken` action has been adjusted to accept `listenBrainzName` as an input parameter. This aligns with the "Completeness of functionality" principle, ensuring the `User` concept does not rely on direct external API calls (which are the responsibility of the `ListenBrainzAPI` concept). Instead, a higher-level synchronization mechanism would orchestrate the `ListenBrainzAPI` to validate the token and fetch the name, then pass these to `User.associateToken`.

```typescript
// file: src/User/UserConcept.ts

import { Collection, Db } from "npm:mongodb";
import { ID, Empty } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";
import * as bcrypt from "npm:bcrypt"; // For password hashing

// Declare collection prefix, use concept name
const PREFIX = "User" + ".";

/**
 * Type alias for a User identifier.
 * Represents an opaque ID that can be treated as a string.
 */
type User = ID;

/**
 * Interface for the User document stored in MongoDB.
 * This represents the structure of a user's data within the User concept's state.
 *
 * @state
 * A set of Users, with:
 *   a `username` of type `String`
 *   a `passwordHash` (hashed from `password`) of type `String`
 *   a `scrobbleToken` of type `String` (optional, as it might be added later)
 *   a `listenBrainzName` of type `String` (optional, associated with scrobbleToken)
 *   a `createdAt` of type `Date`
 */
interface UserDoc {
  _id: User;
  username: string;
  passwordHash: string; // Storing hashed password for security
  scrobbleToken?: string; // Optional: ListenBrainz API token
  listenBrainzName?: string; // Optional: ListenBrainz username associated with the token
  createdAt: Date;
}

export default class UserConcept {
  // MongoDB collection for user documents, representing the 'set of Users' in the state.
  private users: Collection<UserDoc>;

  /**
   * @concept User
   * @purpose associate users with their ListenBrainz token and provide authentication service for web app
   * @principle user gives token to store in ListenBuddy for their session and execute api calls
   */
  constructor(private readonly db: Db) {
    this.users = this.db.collection(PREFIX + "users");
  }

  /**
   * @action createUser
   * Creates a new user account with a unique username and hashed password.
   *
   * @param {string} username - The desired unique username for the new user.
   * @param {string} password - The password for the new user (will be hashed).
   * @returns {{ user: User } | { error: string }} - The ID of the newly created user on success, or an error message.
   *
   * @requires username and password are valid (non-empty), username is not already taken.
   * @effects A new User document is created in the database with the provided username, a hashed password,
   *          and a generated ID. The new user's ID is returned.
   */
  async createUser(
    { username, password }: { username: string; password: string },
  ): Promise<{ user?: User; error?: string }> {
    if (!username || username.trim() === "" || !password || password.trim() === "") {
      return { error: "Username and password cannot be empty." };
    }

    const existingUser = await this.users.findOne({ username });
    if (existingUser) {
      return { error: "Username already taken." };
    }

    const passwordHash = await bcrypt.hash(password, 10); // Hash password with 10 salt rounds
    const newUserId = freshID();
    const newUser: UserDoc = {
      _id: newUserId,
      username: username.trim(),
      passwordHash,
      createdAt: new Date(),
    };

    await this.users.insertOne(newUser);
    return { user: newUserId };
  }

  /**
   * @action associateToken
   * Associates a ListenBrainz scrobble token and the corresponding ListenBrainz username
   * with an existing user.
   *
   * @param {User} user - The ID of the user to associate the token with.
   * @param {string} scrobbleToken - The ListenBrainz API scrobble token.
   * @param {string} listenBrainzName - The ListenBrainz username obtained from validating the token.
   * @returns {{ listenBrainzName: string } | { error: string }} - The associated ListenBrainz username on success, or an error.
   *
   * @requires user exists. `scrobbleToken` is a valid ListenBrainz token, and `listenBrainzName`
   *           is the correct username associated with that token (validation and fetching of `listenBrainzName`
   *           should ideally be performed by the `ListenBrainzAPI` concept or an orchestration layer before this action is called).
   * @effects The specified user's document is updated to include the `scrobbleToken` and `listenBrainzName`.
   *          The successfully associated `listenBrainzName` is returned.
   */
  async associateToken(
    { user, scrobbleToken, listenBrainzName }: {
      user: User;
      scrobbleToken: string;
      listenBrainzName: string;
    },
  ): Promise<{ listenBrainzName?: string; error?: string }> {
    if (!user || scrobbleToken.trim() === "" || listenBrainzName.trim() === "") {
      return { error: "User ID, scrobbleToken, and listenBrainzName cannot be empty." };
    }

    const result = await this.users.findOneAndUpdate(
      { _id: user },
      { $set: { scrobbleToken: scrobbleToken.trim(), listenBrainzName: listenBrainzName.trim() } },
      { returnDocument: "after" }, // Get the updated document
    );

    if (!result.value) {
      return { error: "User not found." };
    }

    return { listenBrainzName: result.value.listenBrainzName };
  }

  /**
   * @action startSession
   * Authenticates a user by verifying their username and password.
   *
   * @param {string} username - The username of the user attempting to log in.
   * @param {string} password - The password provided by the user.
   * @returns {{ user: User } | { error: string }} - The ID of the authenticated user on success, or an error.
   *
   * @requires username and password correspond to an existing user with matching credentials.
   * @effects Conceptually, this authenticates the user's session. No direct state change
   *          within the `User` concept's collections occurs; it primarily serves to validate
   *          credentials and return the user's ID for external session management.
   */
  async startSession(
    { username, password }: { username: string; password: string },
  ): Promise<{ user?: User; error?: string }> {
    if (!username || username.trim() === "" || !password || password.trim() === "") {
      return { error: "Username and password cannot be empty." };
    }

    const userDoc = await this.users.findOne({ username: username.trim() });
    if (!userDoc) {
      return { error: "Invalid username or password." };
    }

    const passwordMatch = await bcrypt.compare(password, userDoc.passwordHash);
    if (!passwordMatch) {
      return { error: "Invalid username or password." };
    }

    return { user: userDoc._id };
  }

  /**
   * @action endSession
   * Signals the conceptual end of a user's session.
   *
   * @param {User} user - The ID of the user whose session is to be ended.
   * @returns {Empty | { error: string }} - An empty object on success, or an error message.
   *
   * @requires user exists.
   * @effects Conceptually, this action ends the user's session. No direct state change
   *          within the `User` concept's collections occurs, as actual session state
   *          is managed by other concepts (e.g., a `Session` concept) or the application layer.
   *          This acts as a trigger for those external systems via synchronization.
   */
  async endSession({ user }: { user: User }): Promise<Empty | { error: string }> {
    if (!user) {
      return { error: "User ID cannot be empty." };
    }
    const userExists = await this.users.findOne({ _id: user });
    if (!userExists) {
      return { error: "User not found." };
    }
    // As per concept design, no internal state change to the User concept's
    // collection is explicitly defined for ending a session. This action primarily
    // serves as a signal or trigger for other concepts or application logic.
    return {};
  }
}
```
