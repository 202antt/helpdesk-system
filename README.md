# 🛠️ My Help Desk Ticketing System

## 👋 About Me & This Project

Hey! I’m Anthony, and this is my full-stack Help Desk Ticket System.

I built this as part of my journey learning Node.js, Express, MongoDB, and vanilla JavaScript from scratch. Along the way, I hit ALL the classic beginner roadblocks 😭 so I decided to document them to help anyone else going through it.

Live Demo:
https://helpdesk-system-esar.onrender.com
(Heads up: it may take a few seconds to load)

---

## 🚀 Features

- Submit tickets
- View all tickets
- Delete tickets
- Works locally and can be deployed online

---

## 🛠️ Tech Stack

Frontend: HTML, CSS, Vanilla JavaScript  
Backend: Node.js, Express  
Database: MongoDB (Local or Atlas)  
Deployment: Render  

---

## ⚙️ Getting Started

1. Clone the repo

git clone https://github.com/YOUR_USERNAME/helpdesk-system.git  
cd helpdesk-system  

2. Install dependencies

npm install  

Make sure:
Node.js is installed → node -v  
npm is working → npm -v  

---

⚠️ PowerShell Fix (if needed)

If you see "running scripts is disabled on this system"

Run PowerShell as admin:

Set-ExecutionPolicy RemoteSigned  

---

3. Connect MongoDB

Local:
mongodb://127.0.0.1:27017/helpdeskDB  

Cloud (MongoDB Atlas):
Set environment variable:

MONGO_URI=your_connection_string  

---

4. Start the server

npm start  

---

⚠️ Port Already in Use Fix

netstat -ano | findstr :3000  
taskkill /PID YOUR_PID /F  

OR change port in server.js:

const PORT = process.env.PORT || 4000  

---

5. Open in browser

http://localhost:3000  

---

## 🧠 Things I Learned (aka what almost took me out 💀)

NPM not recognized  
→ Reinstalled Node.js and fixed PATH  

Running scripts disabled  
→ Changed PowerShell execution policy  

server.js not found  
→ Ran command in correct folder  

Files not showing in public  
→ Files must physically exist inside folder  

[object Object] showing  
→ Used res.json() correctly  

MongoParseError  
→ Updated Mongoose config  

Operation buffering timed out  
→ MongoDB Atlas connection issue  

Port in use (EADDRINUSE)  
→ Killed process or changed port  

Git not recognized  
→ Installed Git + added to PATH  

Git 400 Error (THIS ONE 😭)  
→ DO NOT put @ in GitHub username  

Updating repos  
→ Learned pull, commit, push workflow  

---

## 🌐 Deployment

1. Push to GitHub  
2. Connect repo to Render  
3. Add MONGO_URI  
4. Deploy  

---

## 🚧 Future Improvements

- Upgrade frontend to React  
- Add authentication  
- Improve UI/UX  
- Add ticket categories & priorities  

---

## 💭 Moral of the Story

Building a full-stack app is messy at first, but every error is just a lesson in disguise.

If you can survive Node, MongoDB, npm, and Git all at once…
you can survive anything.

But yeah… you might get a headache in the process 😎
