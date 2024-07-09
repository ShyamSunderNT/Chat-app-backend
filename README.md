Chat-App Backend API Documentation
Welcome to the documentation for the Chat-App backend API. This API facilitates user authentication, messaging, and group chat functionalities.

Base URL
The base URL for all endpoints:

https://chat-sync-backend-gin7.onrender.com
Authentication
Endpoints for user registration, activation, and login.

Register User
Register a new user with first name, last name, email, and password.

URL: POST /signup
Body:

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
Activate Account
Activate user account using the activation token received via email.

URL: GET /activate/
Description: Use the activation token received after registration.
Login User
Authenticate user and obtain an access token.

URL: POST /signin
Body:

{
  "email": "john@gmail.com",
  "password": "123456"
}
User Profile
Endpoints for managing user profiles.

Get User Profile
Retrieve user profile information.

URL: GET /profile
Authorization: Bearer Token <token>
Update User Profile
Update user profile information.

URL: PUT /profile
Authorization: Bearer Token <token>
Body:

{
  "id": "6682b7a01d7a738e36312d44",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@gmail.com"
}
Chat Operations
Endpoints for managing chats and messages.

Create Message
Send a message to a specific user.

URL: POST /chat
Authorization: Bearer Token <token>
Body:

{
  "userId": "668b7b405f4c0d5a757a0611",
  "message": "Hello!"
}
Create Group Chat
Create a group chat with specified users.

URL: POST /chat/group
Authorization: Bearer Token <token>
Body:

{
  "name": "Family Chat",
  "users": ["6684e6dbf3baf026532126dd", "6684f665f3baf0265321289c"]
}
Rename Group Chat
Rename an existing group chat.

URL: POST /chat/rename
Authorization: Bearer Token <token>
Body:
{
  "name": "New Group Name",
  "chatId": "668cdea12c74b74863e58e73"
}
Delete User from Group Chat
Remove a user from a group chat.

URL: POST /chat/groupremove
Authorization: Bearer Token <token>
Body:

{
  "chatId": "668cdea12c74b74863e58e73",
  "userId": "6684f665f3baf0265321289c"
}
Add User to Group Chat
Add a user to an existing group chat.

URL: POST /chat/groupadd
Authorization: Bearer Token <token>
Body:

{
  "chatId": "668cdea12c74b74863e58e73",
  "userId": "6684f665f3baf0265321289c"
}

**URL:** POSTMAN API:https://documenter.getpostman.com/view/34908407/2sA3e2fVAT
