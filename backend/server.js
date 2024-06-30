const app = require("./app");
const express = require("express");
const path = require('path');
const dotenv = require("dotenv");
const cloudinary = require("cloudinary")
const connectDatabase = require("./config/database");
const PORT = process.env.PORT || 5000;


// Handling Uncaught Exception/Error
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

// console.log(you);  // Uncaught Error


// database conncect after calling dotenv.config
// Connecting to database



connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        // res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
        res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}

const server = app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
});


// Unhandled Promise Rejection  ----(its occur when you change the url in config.env file like at the place of 'mongodb' -> mongo or something else)
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
})
