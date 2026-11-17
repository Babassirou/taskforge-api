                                            taskforge-api

                                            I. Introduction

In this project, we put together a minimal API that that has users, projects, and tasks management. It is organized in 3 ressources; Users, Projects, and tasks. The API was designed using Javscript, Node.js and Express.js.
ref: node.js, which is a Javascript runtime enviroment. Node.js allows Javascript, whihcc is a programming language, to run outside the browser. In other term, Node.js allows us to run Javascript on your local computer or inside a server. Express.js. which is a web server built on top of Node.js. Express allows us to build Routes, handle HTTP requests, sends HTTP responses, and organized middleware, and controllers. We will talk more about these points later. We used Bruno, which is an API testing tool, to test our taskforge-api.

                                            II. Technologies

taskforge-api was built using the following technologies:

a. Node.js — Javascript is a popular programming language used by many. Javascript runs inside the browser. Since we decided to build an API on our on device, using Node.js is the easy and logical way to help us execute Javascript outside a browser such as in server or our own locahost.

b. Express.js — API design relies heavyly on Network. When we are talking about network, we talking HTTP (requests/responses). Express.js is a web framework built on top of Node.js. Express allows us to receive HTTP request, Send HTTP response, direct routes, and impliment middleware for checks and error handlling.

c. JavaScript ES Modules — The ES module in Javascript is use to Import and Export code block by allowing strict access and logics accross files. It gives us flexibility to divide our application into separate files.  
For example, in the taskforge-api, we have controlers, whihc are the logic, and the route, whihc are the endpoints. We are able to do:
// Project.controllers.js
export const getProject = (req, res) => {
res.json(projects)
}

//projects.routes.js

import {getProject} from "../controllers/controller.project.js";

d. Bruno — Bruno is an API testing tool. We use Bruno here to get a variety of information from Users, Projects, task with the help of Express.js. Bruno allows us to test all the routes we established.

e. In-memory arrays — Since this was a begginer assignement, the task was simple, we created a file call data.js, to store our data (in memory style). In more advance API design, a season developer will probably use a database management system to store/retirve data. This makes it more permenent and allow to seperate the application and the data. Hence, when the application restart, stactic data stored in memory will be lost.

                                        III. Project Structure

The files and folders are organized separately with inetntions:

Controllers = This where the our application logics lives
data.js = Store our application data
Middleware = This gets execute during the rq/res cycles. Middleware serves as security guard by checking request, correct them, modify them, log them, before passing it to next middleware or route.
app.js = Here is where our application lives. Once the server starts, it get the request and parse it using app.use(express.json()) to allows the request body to be accessible by all. It also hanldes home route, projects/users/tasks route to their respective routes handllers.
server.js = Starts the HTTP server and tells whihc port to listen to, 3000, in localhost.
.env = This is where our the configuration values are store and our application name.

                                        IV. Installation and Setup

Pre-requisite: Node.js, npm, Git

Download the the existing taskforge-api via Git. Run: git clone https://github.com/Babassirou/taskforge-api

Then cd taskforge-api.
install the dependencies with npm install.
copy .env.example to .env file with "cp .env.example .env"
check if your .env conatains: PORT=3000 APP_NAME=TaskForge
start the development server with: npm run dev.
once the application start. Go to Bruno, start a GET instance and enter: http://localhost:3000/
you should see: "message": "TaskForge API is running"

                                    V. Running the application.

To run the application. cd into taskfor-api.
start the server with npm run dev.
you shoudl see: "message": "TaskForge API is running"
local url: http://localhost:3000/
to stop server: press contol + C

                                        VI. API Endpoints

The API is structure into three segments: Users, Projects, and Tasks
The API support 4 methods. Get, Post, Patch, and Delete.

we will use the Users segments do demontrate each method.
Get: you can retieve all users via a API testing tool like Bruno.
initiate a Get request. provide this path: http://localhost:3000/api/users
This operation initial a Get request. This request will be first recived by app.js, app.use("/api/users", userRoutes);
It will direct it to the correct route that will handle the request.
Let see what is hanppening under the hood:
when Bruno sends this request, app.js has an import function-> import express from "express" this is to tell our application to import express. Express is a webframe work built on top of Node.js that allows to handle HTTP requests. We have then, created a variable call const app = express();. the variable app has express. We later, ask to use express to use app.use(express.json()); this help the application parse the json body into readible javascript format so it can be access by other file via req.body. once parse, app.js identify the route for the request: app.use("/api/users", userRoutes);
before reaching the route, the request will go through the logger middleware. The logger, log the request and apply the async method. In other term, await fs.appendFile("./requests.log", logMessage); will wait for the file writing operation and then apply the customer headers.
next() function will send the request to the next middleware or route. If there is an error we have a next(error), request will be send to the middleware error hanlder. If all the boxes are checked, the request will go to the user route. the user.routes.js will send the request to the correct controller path.
In the controller, the logic is explicitly detailed. It will check if all query are provided:

export const getUsers = (req, res) => {
const { role, active } = req.query;

let result = users;

if (role) {
result = result.filter(user => user.role === role);
}

if (active !== undefined) {
result = result.filter(
user => user.active === (active === "true")
);
}

res.status(200).json(result);
};

What does the code do: 

req.query--> Retrieves query parameters from the URL
{ role, active }--> Extracts those parameters
let result = users--> Starts with the complete users array
if (role)--> Checks whether a role filter was provided
.filter()--> Keeps users matching that role
if (active !== undefined)--> Checks whether an active filter was provided
res.status(200).json(result)--> Sends the resulting users with HTTP 200

if everything is good. You should see, all user with status 200 ok. This means operation was executed succesfully.

The controllers have filtering capabilities. In this example, the controller allows to filter by role and status.

Another example is this request; GET /api/users?role=developer

This will return which the role is developer.

export const getUserById = (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json(user);
};

This is available through the req.params.

under user.routes.js you can find all methods and API end points
const router = express.Router();

router.get("/", getUsers);
router.get("/:id/tasks", getUserTasks);
router.get("/:id", getUserById);

router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

app.js mount the user router into the main application 
users.controller.js apply logic and filters

                                            VII. Request Lyfecycle

1. server.js starts the server.
2. app.js receives the incoming request.
3. express.json() parses the JSON body, if present.
4. Logger middleware logs the request.
5. Express matches the route.
6. The route calls the appropriate controller.
7. The controller processes the request and sends a response.
8. Bruno receives the response.


                                        VIII. Request Lyfecycle Explanation

Client / Bruno -> Bruno is our client for the taskforge-api. Bruno send request via HTTP method such GET, POST, PATCH, DELETE
HTTP Request -> HTTP request is enable via express web framework. HTTP is the communication protocol. 
Express Application -> Express Application is the Javascript Web framework that allow us to send and receive HTTP request. Express Application is built on top of Node.js. Node.js allows us to run Javascript outside the browser. 
JSON Middleware -> JSON Middleware is a middleman that sits between the app.js, routers, and other middlewares. It parse the request body into the right Javscript format to make it avaible for other files 
Logger Middleware -> The logger middleware has the fs/promise/async method. When app.js finishes what it is intended, the logger middleware log the request, sends it to routers with next() or to middleware error handler if there is an error in the request with next(error). It wait for the file writting process to apply the response custom header. 
Task Router -> The task Router has specific api endpoints regarding tasks. It send the request to the controller and somone the correct path or logic request method. 
Task Controller -> This where our logic resides. It check the request method, apply filters, or make sure the req.body or req.params has requires information before sending back the response. 
Validation -> Validation checks whether incoming data meets requirements before the application processes it and response travels back to bruno. This response can also be 200 ok, 201 missing filed, 400 bad request, 404 bad route, 500 server error 
Check Project -> This can be done via a Bruno GET request through http://localhost:3000/api/projects
Check Assigned User -> Checking assigned user can be done via Bruno GET request http://localhost:3000/api/users
Create JavaScript Object -> You can create a Javascript object through Bruno POST or PATCH with a json req.body or req.params. If all required fileds are provided, the newly created array can be added via users.push(newuser). You can also create a Javacsript array directly inside data.js.
Push Into Array -> This is done in the controllers with the push method.
HTTP 201 Response -> HTTP 201 reffers to the req/res went well.
Client --> our client in this example is Bruno. The client send in HTTP method with a GET, POST, PATCH, or DELETE to API. 

                                          IX. Conclusion 

Interact with API through a API tester tool.

app.js map will provide the base path 
router.js will map to specific path 
controllers.js will execute request.

Get --> /api/users --> gives you all user 
Get --> /api/users/2 --> retrieve user 2 
delete --> /api/users?role=developer --> delete users with role set to developer 
patch --> /api/user/2 --> will update user number two with the specific changes. This done with a req.body and currently set to update email, name, role, and status  (which set to "active" by default).