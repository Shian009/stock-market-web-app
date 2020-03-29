const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bp = require('body-parser');

const PORT = process.env.PORT || 5000;


//use body parser middleware
app.use(bp.urlencoded({extended:false}));


//API key Publishable API Token: pk_09999b51fa1e49569e5ccd99f02e4a75
//call api function
function call_api(finished,ticker){ 
request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_09999b51fa1e49569e5ccd99f02e4a75', {json:true},(err,res,body)=>{
    if (err) {
        return console.log(err);
    }
    if (res.statusCode === 200) {
        finished(body);
    }
});
};

//set handlebars MIddleware
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

//set handlebars routes
app.get('/',function(req,res){
    call_api(function(done){
        res.render('home',{
            stuff: done 
        });
    },"fb");  
});

//set handlebars POST routes
app.post('/',function(req,res){
    call_api(function(done){
        res.render('home',{
            stuff: done
        });
    },req.body.stockchecker);  
});

app.listen(PORT, ()=>{
    console.log('Server listening @ '+PORT);
});