const express = require("express")
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");
// const cors = require('cors');


const errorMiddleware = require("./middleware/error");


// Config
if(process.env.NODE_ENV!=="production"){
    require("dotenv").config({ path: "backend/config/config.env" });
}


// for development
// app.use(cors(
    // {
        // origin: 'https://vite-commerce.onrender.com',
        // credentials: true,
    // }
// ));


// for production
// app.use(cors(
//     {
//         origin: 'http://localhost:3000',
//         credentials: true,
//     }
// ));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true
}));




// Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);



// Middleware for Errors
app.use(errorMiddleware);

module.exports = app