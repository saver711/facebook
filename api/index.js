const express = require("express")
const { readdirSync } = require("fs")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require("path")

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(
  fileUpload({
    useTempFiles: true,
  })
)

//routes
app.use(require(`./routes/user`))
app.use(require(`./routes/post`))
app.use(require(`./routes/upload`))
app.use(require(`./routes/react`))


// readdirSync("./routes").map((route) =>{
//   return app.use("/", require(`./routes/${route}`))
// })

//database
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("error connecting to mongodb", err))

app.use(
  express.static(path.join(__dirname, "../build"))
)

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../build", "index.html")
  )
})

//
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`server is working on port ${PORT}`))
