var express = require( 'express' );
var router = express.Router();

const fs = require('fs');
const mongoose = require('../config/mongoose');
const UserModel = require( '../models/User' );
const transporter = require( '../config/nodemailer' );
const jwt = require( 'jsonwebtoken' );
const config = require('../config/password');
const SECRET_JWT = require( '../config/password' ).SECRET_JWT;
const bcrypt = require('bcrypt');
const multer  = require('../config/multer');

//new user
router.post( '/signup', function ( req, res, next ) {
  console.log(req.body);
    new UserModel( {
            ...req.body,
            confirmEmail: false
        } ).save()
        .then( user => {
            console.log( "esto es el usuario ", user )
            const token = jwt.sign( { _id: user._id }, SECRET_JWT, { expiresIn: "48h" } )
            console.log( "esto es el token ", token )
            const url = `http://localhost:3000/users/activacion/${token}`
            console.log( "esto es la url ", url )
            transporter.sendMail( { //enviamos el email con la siguiente información:
                // from: "bootcampstream@gmail.com", //procedencia del email
                from : `${config.GMAIL.email}`,
                to: user.email, // destinatario del email
                subject: "Active su cuenta en nuestra web de viajes", //asunto del email
                html: ` 
       <h1>Bienvenido a nuestra web de viajes</h1>

      <p>Porfavor, active su cuenta clicando el siguiente link:
        <a href="${url}">
           Click aquí para activar tu cuenta
        </a>
      </p>
      ` //mensaje en HTML que enviamos al destinatario

            } )
            res.status( 201 ).send( "usuario registrado, porfavor confirme su dirección de correo electrónico" )
            res.redirect('verifyEmail')//car
        } )
        .catch( error  => {
          console.log(error);
          res.redirect('register'); //car
        })
} );

//email confirmation
router.get( '/activation/:jwt', ( req, res ) => {
    try {
        const payload = jwt.verify( req.params.jwt, SECRET_JWT )
        console.log( "esto es el payload ", payload )
        UserModel.findByIdAndUpdate( payload._id, { confirmEmail: true },{new: true} )
            .then( user => {
              console.log(user)
              res.send( user ) ;
              res.redirect("/users/userVerified"); //car
            })
    } catch ( error ) {
        res.status( 400 ).send( error )
    }
} );

router.post('/login', (req, res) => {
  console.log(req.body);
  UserModel.find({ 
    $or: [
      {username: req.body.username},
      {email: req.body.email}
    ]
  })
  .then( user => {
    if(!user) return res.status(400).send('usuario o email no es correcto');
    
    if(user.confirmEmail == false) return res.status(400).send('You have to confirm your email')
    
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if(!isMatch) return res.status(400).send('password no es correcto');
      res.json(user);
    })
  })
});

router.post('/recovery',(req,res)=>{
  console.log(req.body.email)
  const token=jwt.sign({email: req.body.email},SECRET_JWT, { expiresIn: "48h"})
    const url = `http://localhost:3000/users/resetPassword1/${token}`
  transporter.sendMail({
    from : `${config.GMAIL.email}`, //car
    // from:"bootcampstream@gmail.com",
    to:req.body.email,
    subject:"Recover your password",
    html:`
    <h1>Recover your password following the instructions bellow</h1>
    <p>Please, click the following link to reset your password:
      <a href="${url}">
        click aquí para activar tu cuenta
      </a>
      <span>This link will expire in 48 hours.</span>
    </p>
    `
    }).then(()=>res.render(''))
    .catch(console.log)
    res.redirect('/users/passwordRecoverySent'); //car
});


router.get('/passwordRecoverySent', function(req, res) {
  res.render('passwordRecoverySent');
});

router.get('/resetPassword1/:jwt',(req,res)=>{
  res.render('resetPassword')
})

router.post('/passwordChanged',(req,res)=>{
 // req.headers.referer //aquí viene la url anterior
 console.log(req.headers.referer.split('resetPassword/'));
 const token = req.headers.referer.split('resetPassword/')
 const email=jwt.verify(token,SECRET_JWT)
 UserModel.findOne({email}).then(user=>{

 const password= bcrypt.hash(req.body.password,10)
  UserModel.findOneAndUpdate({email},{password}).then(user=>{
    res.redirect('/login')
  })
 })
})

router.post('/uploadImage', multer.single('avatar'), (req, res) => {
    console.log(req.file.filename)
})

module.exports = router;

