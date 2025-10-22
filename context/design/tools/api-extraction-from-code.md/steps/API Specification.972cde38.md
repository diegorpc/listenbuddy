---
timestamp: 'Tue Oct 21 2025 15:33:15 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251021_153315.a8b69404.md]]'
content_id: 972cde385709ee009aa2e603a728c557275da15110d6a9b4c7c17f88e4b8c0f4
---

# API Specification: User Concept

**Purpose:** associate users with their ListenBrainz token and provide authentication service for web app

***

## API Endpoints

### POST /api/User/createUser

**Description:** Registers a new user account with a unique username and password.

**Requirements:**

* username and password are valid
* username is not taken

**Effects:**

* creates User object with username and password, and returns it.

**Request Body:**

```json
{
  "username": "String",
  "password": "String"
}
```

**Success Response Body (Action):**

```json
{
  "user": "String"
}
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/User/associateToken

**Description:** Associates a ListenBrainz scrobble token with an existing user.

**Requirements:**

* user exists
* scrobbleToken is a valid ListenBrainz token

**Effects:**

* associates user with scrobbleToken and returns listenBrainzName

**Request Body:**

```json
{
  "user": "String",
  "scrobbleToken": "String"
}
```

**Success Response Body (Action):**

```json
{
  "listenBrainzName": "String"
}
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/User/startSession

**Description:** Authenticates a user by verifying their username and password, initiating a session.

**Requirements:**

* username and password correspond to an existing user

**Effects:**

* authenticates user's session, returns user object

**Request Body:**

```json
{
  "username": "String",
  "password": "String"
}
```

**Success Response Body (Action):**

```json
{
  "user": "String"
}
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/User/endSession

**Description:** Ends an existing user's session.

**Requirements:**

* user exists

**Effects:**

* ends user's session

**Request Body:**

```json
{
  "user": "String"
}
```

**Success Response Body (Action):**

```json
{}
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***
