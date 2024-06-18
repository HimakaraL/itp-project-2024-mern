const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const reservationRouter = require("./src/routes/reservation");
const serviceRouter = require("./src/routes/services");
const userRouter = require("./src/routes/user");
const financeRouter = require("./src/routes/finances");
const requireAuth = require('./src/middleware/requireAuth')
const maintainRouter=require("./src/routes/maintains");
const marketingRouter = require("./src/routes/marketings");
const inventoryRouter = require("./src/routes/inventory");
const employeeRouter = require("./src/routes/employees.js");
const salaryRouter = require("./src/routes/SalaryRoute.js");
const generateEmployeePDFRouter = require("./src/routes/employeepdf.js");
const generateSalaryPDFRouter = require("./src/routes/empsalarypdf.js");
const rentalRouter = require("./src/routes/rentals");
const feedbackRouter = require("./src/routes/feedbacks");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use('/icons', express.static('./Icon-svgs'));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
    .then(()=>{
        console.log("MongoDB Connection Success!");
        app.listen(PORT,()=>{
            console.log(`Server is up and running on Port Number: ${PORT}`)
        });
    }).catch((err)=>{
        console.log(err);
    });

app.use("/reservation",requireAuth,reservationRouter);
app.use("/service",requireAuth, serviceRouter);
app.use("/finance",requireAuth, financeRouter);
app.use("/maintain",requireAuth,maintainRouter);
app.use("/marketing",requireAuth, marketingRouter);
app.use("/inventory",requireAuth, inventoryRouter);
app.use("/employee",requireAuth, employeeRouter);
app.use("/salary",requireAuth,requireAuth, salaryRouter);
app.use("/generate-employee-pdf", requireAuth,generateEmployeePDFRouter);
app.use("/generate-salary-pdf",requireAuth, generateSalaryPDFRouter);
app.use("/rental",requireAuth,rentalRouter);
app.use("/feedback", requireAuth, feedbackRouter);
app.use("/user", userRouter);





