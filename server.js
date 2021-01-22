const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const port = process.env.PORT || 9001
const expressJwt = require("express-jwt")

process.env.SECRET

app.use(express.json())
app.use(morgan("dev"))
//for deployment below:
// app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect("mongodb://localhost:27017/newsdb",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to database")
)

app.use("/api", expressJwt( {secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use("/auth", require("./routes/authRouter"))
app.use("/api/news", require("./routes/newsRouter"))

app.use((error, request, response, next) => {
    console.log(error)
    if(error.name === "UnauthorizedError"){
        response.status(error.status)
    }
    return response.send({errorMessage: error.message})
})

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.listen(port, () => {
    console.log("The server is running on Port 9001")
})