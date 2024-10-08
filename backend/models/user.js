const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {    
        type: String,    
        minLength: 3,
        required: true,    
        unique: true // this ensures the uniqueness of username  
    },
    passwordHash: {    
        type: String,    
        minLength: 3,
        required: true
    },
    //favoriteMovies contiene las id de IMBd
    favoriteMovies: [
      {
        type: String,
      }
    ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User