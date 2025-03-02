const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use session to temporarily store data
app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
}));

// Serve the form page
app.get("/", (req, res) => {
    res.render("index", { error: null });
});

// Handle form submission
app.post("/submit", (req, res) => {
    const { username, email, phone, dob, gender, address } = req.body;

    // Server-side validation
    if (!username || !email || !phone || !dob || !gender || !address) {
        return res.render("index", { error: "All fields are required!" });
    }


    // Store validated data in session
    req.session.userData = { username, email, phone, dob, gender, address };

    // Redirect to result page
    res.redirect("/result");
});

// Show stored data
app.get("/result", (req, res) => {
    if (!req.session.userData) {
        return res.redirect("/");
    }

    res.render("result", { userData: req.session.userData });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
