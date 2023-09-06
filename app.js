const express = require("express");
const app = express();
const path=require("path");
const mongoose=require('mongoose');
//for saving data in database using post request and express app
const bodyparser=require('body-parser');
const port = 8000;
app.use('/static',express.static('static')); 
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'viewsfolder'));
app.get("/", (req, res)=>{ 
    const params={}
    res.status(200).render('home.pug',params);
});
main().then(()=>{
    console.log("we are connected");
 }).catch(err => console.log(err));
 
 async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
 }
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
  });
  const Contact = new mongoose.model('Kitten', contactSchema);
app.get("/contact", (req, res)=>{ 
    const params={}
    res.status(200).render('contact.pug',params);
});
app.post("/contact", (req, res)=>{
    const myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send('This item has been saved to the database');
    }).catch(()=>{
    res.status(400).send('item was not saved to the databse');
})
})

app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});

