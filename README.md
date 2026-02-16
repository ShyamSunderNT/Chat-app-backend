Chat-Sync Backend API Documentation
Welcome to the documentation for the Chat-Sync backend API. This API provides endpoints for user registration, authentication, and chat functionalities.

Base URL
The base URL for all endpoints:

bash
https://chat-sync-backend-gin7.onrender.com/api
Register User
Register User
Register a new user with first name, last name, email, and password.

URL: POST
https://chat-sync-backend-gin7.onrender.com/api/signup

Description: Endpoint for registering a new user.
Authentication
Activate Account
Activate user account using the activation token received via email.

URL: POST 
https://chat-sync-backend-gin7.onrender.com/api/signin

Description: Endpoint for user authentication.
User Profile
Get User Profile
Retrieve user profile information.

URL: GET 
https://chat-sync-backend-gin7.onrender.com/api/profile

Authorization: Bearer Token <token>
Update User Profile
Update user profile information.

URL: PUT 
https://chat-sync-backend-gin7.onrender.com/api/profile

Authorization: Bearer Token <token>
Chat Operations
Send Message
Send a message to a specific user.

URL: POST
https://chat-sync-backend-gin7.onrender.com/api/chat

Authorization: Bearer Token <token>
Create Group Chat
Create a group chat with specified users.

URL: POST 
https://chat-sync-backend-gin7.onrender.com/api/chat/group

Authorization: Bearer Token <token>
Rename Group Chat
Rename an existing group chat.

URL: POST 
https://chat-sync-backend-gin7.onrender.com/api/chat/rename

Authorization: Bearer Token <token>
Remove User from Group Chat
Remove a user from a group chat.

URL: POST 
https://chat-sync-backend-gin7.onrender.com/api/chat/groupremove

Authorization: Bearer Token <token>
Add User to Group Chat
Add a user to an existing group chat.

URL: POST 
https://chat-sync-backend-gin7.onrender.com/api/chat/groupadd

Authorization: Bearer Token <token>
API Documentation
For detailed API documentation, including request formats and response schemas, please refer to Postman Documentation.

In this README.md file:

Each endpoint is listed with its URL and a brief description.
Authorization requirements (Bearer Token <token>) are specified where necessary.
A section is provided for linking to more detailed API documentation hosted on Postman.
Make sure to replace <token> with the actual authorization token format your API expects, and adjust the URLs and descriptions according to your specific implementation. This structure will help developers understand and effectively utilize your chat application backend API.



