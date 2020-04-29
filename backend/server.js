var express = require('express');
var mongoose = require('mongoose');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var cors = require('cors');

var path = require('path');
var app = express();



 const PORT = process.env.PORT || 3073;

 
 
 app.use(cors({origin: [
    "http://localhost:4200"
  ], credentials: true}));
//app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({secret: 'secret',
				 saveUninitialized:false,
                 resave: false,
                 proxy: true,
				 store: new MongoStore({ mongooseConnection: mongoose.connection,
				 							ttl: 2 * 24 * 60 * 60 })}));

app.all('/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","CONTENT-TYPE,Accept,X-Access-Token,X-Key");
    if(req.method=='OPTIONS')
    {
        res.status(200).end();

    }
    else{
        next();

    }
});

app.use('/api',require('./api/index'));



 app.get('*',(req,res)=> {

});
var server1 = app.listen(PORT,function(){
    console.log('working server');
});
server1.timeout=5000000



// hosting

// var express = require('express');
// var bodyParser = require('body-parser');
// var cors = require('cors');

// var path = require('path');

// var app = express();
//  const PORT = process.env.PORT || 3073;
// app.use(cors());
// app.use(express.static(path.join(__dirname,'public')));
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

// app.all('/*',function(req,res,next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers","CONTENT-TYPE,Accept,X-Access-Token,X-Key");
//     if(req.method=='OPTIONS')
//     {
//         res.status(200).end();

//     }
//     else{
//         next();

//     }
// });
// app.use('/api',require('./api/index'));



// app.get('*',(req,res)=> {
//     res.sendFile(path.join(__dirname,'public/index.html'))});
// var server1 = app.listen(PORT,function(){
//     console.log('working server');
// });
// server1.timeout=500000
  







