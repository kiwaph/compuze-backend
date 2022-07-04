# Compuze Backend
API of Compuze, a platform to facilitate buying and selling used computer parts\
:bug: <a href="https://github.com/kiwaph/compuze-backend/issues">Report Bug</a>

### Public Endpoints

#### Users
* Get user: `GET /users/:userId`

* Login: `POST /users/login`\
Valid Request content-type: **application/json**\
Required parameters: **username, password**

* Signup: `POST /users/signup`\
Valid Request content-type: **application/json**\
Required body parameters: **username, password, email, phone**\

* Get user's items: `GET /users/:userId/items`

#### Items
* Get items: `GET /items`

* Get item: `GET /items/:itemId`

* Increment views: `PATCH /items/:itemId/views`

* Get random item: `GET /items/random`

#### Comments
* Get comments `GET /comments`

* Get comment : `GET /comments/:commendId`

### Endpoints that require authentication
`Authorization: 'Bearer <token>'`

#### Users
* Edit user: `PATCH /users/:userId`\
Valid Request content-type: **application/json**\
Required body parameters: **userId**\
Optional body parameters: **phone, email, password**\


#### Items
* Post item: `POST /items`\
Valid Request content-type: **application/json**\
Required parameters: **type, brand, model, description, location, price**

* Edit item: `PUT /items/:itemId`\
Valid Request content-type: **application/json**\
Required parameters: **itemId, type, brand, model, location, description, price**

* Delete item: `DELETE /items/:itemId`

#### Messages
* Get message: `GET /messages/:messageId` 

* Get messages: `GET /messages` 

* Send message: `POST /messages`\
Valid Request content-type: **application/json**\
Required body parameters: **subject, content, senderId, recipientId**

* Delete messages: `DELETE /messages/:messageId` 

* Mark as read: `PATCH /messages/:messageId/read`

* Mark as unread: `DELETE /messages/:messageId/read`

#### Favorites
* Get logged-in user's favorites: `GET /favorites` 

* Check if item is favorite: `GET /favorites/:itemId`

* Add item to favorite: `POST /favorites/:itemId`

* Delete favorite: `DELETE /favorites/:itemId`

#### Comments
* Post comment: `POST /comments`
Valid Request content-type: **application/json**\
Required body parameters: **content, itemId**

* Delete comment: `DELETE /comments/:commentId`

### Running the development instance

#### Prerequisites
* Edit the **.env** file and specify the environment variables
* Create a MySQL database with the same name specified in the .env file

#### Running the development server
* Install dependencies: `npm install`
* Install nodemon: `npm install -g nodemon`
* Run server: `npm run dev`
