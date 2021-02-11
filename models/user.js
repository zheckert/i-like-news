const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

//encrypt passwords on signup
userSchema.pre("save", function(next){
  const user = this
  if(!user.isModified("password")) return next()
  bcrypt.hash(user.password, 10, (error, hash) => {
    if(error) return next(error)
    user.password = hash 
    next()
  })
})

//check encrypted password
userSchema.methods.checkPassword = function(passwordAttempt, callback){
  bcrypt.compare(passwordAttempt, this.password, (error, isMatch) => {
    if(error) return callback(error)
    return callback(null, isMatch)
  })
}
//make sure passwords don't get to the frontend
userSchema.methods.withoutPassword = function(){
  const user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model("User", userSchema)