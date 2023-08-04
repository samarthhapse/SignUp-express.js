const express=require('express'); 
// const { request } = require('http');
const http = require('http');

const app=express();
const port=80; 
const path = require('path');
const fs = require('fs');

// EXPRESS SPECIFIC STUFF //
app.use('/pintya',express.static('static'));  // for serving static file in app.js
app.use(express.urlencoded()); // to transefer all data of our website to express

// PUG SPECIFIC STUFF //
app.set('view engine','pug') //set the templete engine 
app.set('views',path.join(__dirname,'views')); //set the views directory

// ENDPOINTS //
app.get("/",(req,res)=>{
    const con="Kindly fill the form below to get membership of G3 gym .";
    const param={'title':"Backend Form using express",'content':con};
    res.status(200).render('index.pug',param);
});
app.post("/",(req,res)=>{
    // console.log(req.body);
    name=req.body.name;
    age=req.body.age;
    gender=req.body.gender;
    address=req.body.address;
    more=req.body.more;

    let outputToWrite=`name of client is ${name},age is ${age},gender is ${gender},address enterd is ${address},more entered is ${more}`;

    fs.writeFileSync('output.txt',outputToWrite)

    const param={'message':'Your form is submitted successfully.'}
    res.status(300).render('index.pug',param);

});

// START THE SERVER
app.listen(port,()=>{
    console.log(`App successfully started on ${port}`)
})