Help Desk Ticket System
About Me & This Project

Hey! I’m Anthony, and this is my full-stack Help Desk Ticket System. I built it as part of my journey to learn Node.js, Express, MongoDB, and vanilla JS from scratch. Along the way, I hit all the classic beginner roadblocks, so I thought I’d document them here to help anyone else who’s learning.

This project lets you:

Submit tickets

View all tickets

Delete tickets

Works locally and can be deployed online

Tech Stack

Frontend: HTML, CSS, Vanilla JavaScript

Backend: Node.js, Express

Database: MongoDB (local or Atlas)

Deployment: Render (or any cloud host supporting Node)

Installation / Running Locally

Clone the repo

git clone https://github.com/<YourActualUsername>/helpdesk-system.git
cd helpdesk-system

Install dependencies

npm install

Make sure you have Node.js installed (node -v) and npm works (npm -v).

If you see “running scripts is disabled on this system”, run PowerShell as admin and do:

Set-ExecutionPolicy RemoteSigned

Connect MongoDB:

Local: defaults to mongodb://127.0.0.1:27017/helpdeskDB

Cloud: set MONGO_URI environment variable

Start the server

npm start

⚠️ !!!!!! Watch out for port 3000 already in use. Either kill the process using it:

netstat -ano | findstr :3000
taskkill /PID <PID> /F

Or just change the port in server.js:

const PORT = process.env.PORT || 4000

Open http://localhost:3000 (or your port) in your browser

Things I Learned / Problems I Ran Into

NPM not recognized → Had to reinstall Node.js and fix PATH variables.

Running scripts is disabled → Had to change PowerShell execution policy.

server.js not found → Make sure you’re in the correct folder when running node server.js.

Files not showing in public folder → Learned how VS Code folder structure works; files must be physically inside public/.

[object Object] showing in browser → Realized I needed to res.json() and handle responses correctly.

MongoParseError: options useNewUrlParser, useUnifiedTopology are not supported → Updated Mongoose connection options.

Operation buffering timed out → Connection to MongoDB Atlas not configured correctly.

Port in use (EADDRINUSE) → Killed old Node process or changed port.

Git not recognized → Had to install Git and add it to PATH.

Git 400 error → Using wrong URL syntax (<username> Added "@" in front of username so many times until I realized the error SO DO NOT PUT THE @ in front of the Username lol) — fixed with actual username.

Deployment

Push to GitHub (make sure you use your actual username *NO @* in the URL)

Connect repo to Render.com

Set MONGO_URI in environment variables if using Atlas

Start service → live demo is ready

Future Improvements

Upgrade frontend to React

Add authentication for tickets

Improve UI/UX

Add ticket categories & priorities

Moral of the story

Building a full-stack app is messy at first, but every error is just a lesson in disguise. If you can survive Node, Mongo, npm, and Git all at once… you can survive almost anything. Butttt... you might get a headache in the process 😎
