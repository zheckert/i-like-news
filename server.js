const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")
const port = process.env.PORT || 9001

app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to database")
    )

app.use("/news", require("./routes/newsRouter"))

app.use((error, req, res, next) => {
    console.log(error)
    return res.send({errorMessage: error.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log("The server is running on Port 9001")
})