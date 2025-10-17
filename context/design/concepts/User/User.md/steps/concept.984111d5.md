---
timestamp: 'Fri Oct 17 2025 00:08:51 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251017_000851.99161ef2.md]]'
content_id: 984111d58c6a80f7a2703203be13f2595f79d6cca95c98fef16ababfe2dd7f3e
---

# concept: User

* **concept**: User

* **purpose**: associate users with their ListenBrainz token and provide autentication service for web app

* **principle**: user gives token to store in ListenBuddy for their session and execute api calls

* **state**:

* A set of Users, with:

* a `username` of type `String`

* a `password` of type `String`

* a `scrobbleToken` of type `String`

* **actions**:

* `createUser(username: String, password: String): (User)`

* **requires**: username and password are valid, username is not taken

* **effect**: creates User object with username and password, and returns it.

* `associateToken(user: User, scrobbleToken: String): ()`

* **requires**: user exists, scrobbleToken is a valid ListenBrainz token

* **effect**: associates user with scrobbleToken

* `startSession(username: String, password: String): (User)`

* **requires**: username and password correspond to an existing user

* **effect**: authenticates user's session, returns user object

* `endSession(user: User): ()`

* **requires**: user exists

* **effect**: ends user's session
