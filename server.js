const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")
const port = process.env.PORT || 9001

process.env.SECRET

app.use(express.json())
app.use(morgan("dev"))
//for deployment below:
// app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect("mongodb://host:27017/newsdb",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to database")
    )

app.use("/auth", require("./routes/authRouter"))
app.use("/news", require("./routes/newsRouter"))

app.use((error, req, res, next) => {
    console.log(error)
    return res.send({errorMessage: error.message})
})

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.listen(port, () => {
    console.log("The server is running on Port 9001")
})