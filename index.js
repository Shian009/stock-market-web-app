const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const PORT = process.env.PORT || 5000;


//API key Publishable API Token: pk_09999b51fa1e49569e5ccd99f02e4a75
//call api function
function call_api(finished){ 
request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_09999b51fa1e49569e5ccd99f02e4a75', {json:true},(err,res,body)=>{
    if (err) {
        return console.log(err);
    }
    if (res.statusCode === 200) {
        finished(body);
    }
});
}

//set handlebars MIddleware
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

//set handlebars routes
app.get('/',function(req,res){
    call_api(function(done){
        res.render('home',{
            stuff: done 
        });
    });  
});
//static folder
app.use(express.static(path.join(__dirname,'public')));



app.listen(PORT, ()=>{
    console.log('Server listening @ '+PORT);
});