// Bring in Express (a tool to build web servers)
import express from "express";

// Bring in CORS (allows your backend to talk safely with frontend from another domain)
import cors from "cors";

// Bring in cookie-parser (helps us read cookies sent by the browser)
import cookieParser from "cookie-parser";

// Create an Express app (this is like our web server/shop)
const app = express();

// Allow cross-origin requests (frontend from another domain can talk to backend)
// "origin" decides who is allowed (set in environment variable CORS_ORIGIN)
// "credentials: true" allows sending cookies and authentication info
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Parse (read) JSON data from incoming requests
// Example: { "name": "Viraj" } will be understood
// Limit: max 16kb so people can't send too much data
app.use(express.json({
    limit: "16kb"
}))

// Parse form data (like from <form> in HTML)
// extended: true means it can handle complex data (like objects inside objects)
// Limit is also 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// Serve static files (like images, CSS, JS) from "public" folder
// Example: if you put logo.png in public, it will be available at /logo.png
app.use(express.static("public"))

// Enable cookie parser so we can easily read cookies
// Cookies are small bits of data browsers save and send with requests
app.use(cookieParser())

// Export the app so it can be used in another file (like where we start the server)
export {app}
