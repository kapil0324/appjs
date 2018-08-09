
const express=require('express');
const bodyParser=require('body-parser');
const {check, validationResult } = require('express-validator/check'); 
const {matchedData ,sanitizeBody } = require('express-validator/filter');	
var path = require('path');
const app=express();
app.set('views', path.join(__dirname, '/public/pages/'));
app.set('view engine', 'twig');
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.get('/',(req, res)=>{
	
	res.render('index',{title:"form"});

})
app.post('/',[
  // username must be an email
  check('name','Fill username').isEmail(),
  // password must be at least 5 chars long
  check('pass','Fill password').isLength({ min: 5 })
],(req, res)=>{
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
  	const user=matchedData(req);
    res.render('index',{title:"Login user",errors: errors.mapped(),user: user});
  }else{
  	const user=matchedData(req);
	 console.log(req.body);
//res.send('helll');
  	res.render('welcome',{user:user});
  } 
	

})
app.listen('8080',()=>console.log("Serever is running:http://localhost:8080"));

