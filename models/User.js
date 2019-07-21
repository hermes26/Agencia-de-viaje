const mongoose = require( 'mongoose' );
const bcrypt = require('bcrypt');
const { isEmail } = require( 'validator' );
const jwt = require('jsonwebtoken')
const SECRET_JWT = require( '../config/password' ).SECRET_JWT; //car
const SALT=10;

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        maxlength: 40,
        required:true,
    },
    lastname: String,
    email: {
        type: String,
        unique: true,
        required: true,
        validate: (email) => isEmail(email),
        message: 'the {VALUE} entered is not a valid email.'
    },
    confirmEmail: Boolean,
    password: {
        type: String,
        minlength: 6,
        required:true,
    },
    imagePath: String
}, {
    timestamps: true
});


userSchema.methods.toJSON = function () { //override of the toJSON method to add token and remove password fields
    const { _id, name, lastname, username, email, token } = this; //here we take the user properties
    //this._id = _id; this.name = name ... etc
    return { _id, name, lastname, username, email, token }; //here we return the user properties
};

userSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({_id:user._id},SECRET_AUTH_JWT, {expiresIn: '2d'});
    return token;
}

//this function will execute before save() del usuario y encriptará su password
userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT)
    .then(salt => bcrypt.hash(user.password, salt)
    .then(hash => {
      user.password = hash;
      return next();
    }))
    .catch(err => resizeBy.status(500).send(error));
  } else next();
});

const userModel= mongoose.model('User',userSchema);

module.exports=userModel;