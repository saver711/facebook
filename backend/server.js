const express = require('express');
const {readdirSync} = require('fs');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();


const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

//routes
readdirSync('./routes').map( route => app.use('/', require(`./routes/${route}`)) )

//database
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}).then(() => console.log('DB connected')).catch(err => console.log('error connecting to mongodb', err))


//
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`server is working on port ${PORT}`))