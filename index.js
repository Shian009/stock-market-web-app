const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 5000;


app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

//set handlebars routes
app.get('/',function(req,res){
    res.render('home',{
        stuff: "hiteplaye" 
    });
    
});
//static folder
app.use(express.static(path.join(__dirname,'public')));



app.listen(PORT, ()=>{
    console.log('Server listening @ '+PORT);
});