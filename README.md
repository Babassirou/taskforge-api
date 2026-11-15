                            TaskForge API

                            I. Introduction 

In this project, we put together a minimal API that that has users, projects, and tasks management. It is organized in 3 ressources; Users, Projects, and tasks. The API was designed using Javscript, Node.js and Express.js. 
ref: node.js, which is a Javascript runtime enviroment. Node.js allows Javascript, whihcc is a programming language, to run outside the browser. In other term, Node.js allows us to run Javascript on your local computer or inside a server. Express.js. which is a web server built on top of Node.js. Express allows us to build Routes, handle HTTP requests, sends HTTP responses, and organized middleware, and controllers. We will talk more about these points later. We used Bruno, which is an API testing tool, to test our TaskForge API. 

                            II. Technologies 

TaskForge API was built using the following technologies: 

a. Node.js — Javascript is a popular programming language used by many. Javascript runs inside the browser. Since we decided to build an API on our on device, using Node.js is the easy and logical way to help us execute Javascript outside a browser such as in server or our own locahost. 

b. Express.js — API design relies heavyly on Network. When we are talking about network, we talking HTTP (requests/responses). Express.js is a web framework built on top of Node.js. Express allows us to receive HTTP request, Send HTTP response, direct routes, and impliment middleware for checks and error handlling. 

c. JavaScript ES Modules — The ES module in Javascript is use to Import and Export code block by allowing strict access and logics accross files. It gives us flexibility to divide our application into separate files.  
For example, in the TaskForge API, we have controlers, whihc are the logic, and the route, whihc are the endpoints. We are able to do:
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

To install this project is simple: 
In your terminal, create a directory with command mkdir name **you preferred name** or name it TaskForgeAPI. Ex: mkdir TaskForgeAPI 
cd into the directory using: cd TaskForgeAPI
execute npm init -y to creates a package.json with default setting. 
execute npm install express to install Express.js as a project dependency 