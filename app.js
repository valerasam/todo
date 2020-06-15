const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const index = require("./routes/index");
const tasks = require("./routes/tasks");


const app = express()
const PORT = config.get('port') || 5000

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);

//View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, "client")));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/api", tasks);

async function start() {
    try {
        await mongoose.connect(("mongodb+srv://valerii:62321200@cluster0-m2x6x.mongodb.net/tasks?retryWrites=true&w=majority"),
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}


start()