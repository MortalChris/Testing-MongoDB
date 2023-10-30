const express = require("express");
const path = require("path");
const port = 3000;
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true
} ,console.log("connected to database"));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Create a schema and model for your data
const DataModel = mongoose.model('Data', new mongoose.Schema({
    // Define your data schema here
    firstName: String,
    lastName: String,
    // Add more fields as needed
}));

// run();
// async function run() {
//     const testData = new DataModel({
//             firstName: "Man",
//             lastName: "Test"
//     })
//     await testData.save();
//     console.log(testData);
// }

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.post("/", async (req, res, next) => {//Post needs to be the same as the file page location
    try {
        const data = new DataModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        const result = await data.save();
        res.redirect("newPage.html");
        console.log("result");
    } catch (err) {
        console.log("Error")
        return next(err);
        
        };
});

    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`)
    });