var express = require('express');
//creates a router as a module
var router = express.Router(); //OK

// const User = require('../models/User');
// const Destinations = require('../models/Destination')



/* GET home page. */
router.get('/', (req, res) => { //OK
//      title: 'Express' ,  
//      headContent: `<a class="btn btn-outline-primary" href="http://localhost:3000/register" role="button">Únete ahora</a>
//      <a class="btn btn-outline-success" href="http://localhost:3000/login" role="button">Sign In</a>`,
//     headWords: `<div class="header">
//     <div class="headerWords">
//     <h1>Viaja!</h1>
//     <p>Descubre lugares maravillosos</p>
//     <button>Ver Destinos</button>
// </div>
// </div>`
  // Destination.find({}).then(destinations => { //destinations is what is returned from the db Destinations
  // let data={
  //     title: 'Travel Agency',
  //     destinations,
  // }
  // if(req.isAuthenticated()) 
  //     return User.findById(req.session.passport.user).then(user=>{
  //     res.render('index.hbs',{
  //     ...data,
  //     user
  // })}) .catch(err=>console.log(err))

 //the template engine looks in the 'views' folder for 'index.hbs'
  // res.render('index.hbs',data );
  res.render('index.hbs', {title: 'Travel Agency'})
// })
  });


//RES.RENDER: Renders a view and sends the rendered HTML string to the client.
//The view argument is a string that is the file path of the view file to render.
//The view argument performs file system operations like reading a file from disk and evaluating Node.js modules
router.get('/register', (req,res) => {
  res.render('register.hbs')
});


  router.get('/login', (req,res) => res.render('login.hbs'));
// router.get('/prueba', (req,res) => res.send('esto es una prueba'));


module.exports = router;
