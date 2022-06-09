const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const {Schema} = mongoose;
require('dotenv').config()

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,  useUnifiedTopology: true }).then(
    ()=>console.log("connected to database")
).catch(err => console.log(err))

const userDataSchema = new Schema({
    Name: String,
    Email: String,
    Contact: Number,
    Date: String
})

var userData = mongoose.model('userData', userDataSchema);

app.post('/', (req,res)=>{
    let {"name": name, "email":email, "contact": contact, "date":date} = req.body;
    date = new Date(date)
    if(date == null || date == "Invalid Date"){
        date = new Date();
    }

    var user = new userData({
        Name: name,
        Email: email,
        Contact: contact,
        Date: date
    })
    user.save(function(err,data){
        if(err) return console.error(err);
        res.status(200).send(data)
    })
})

app.listen(PORT, ()=> console.log(`listening on port ${PORT} ...`))