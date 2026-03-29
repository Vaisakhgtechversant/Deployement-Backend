const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/food')

const products=mongoose.model('products',{
    id: {
    require: true,
    type: String,
  },
  firstName: {
    require: true,
    type: String,
  },
  lastName: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  image: {
    type: Buffer,
  },
  otp: {
    require: false,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
  role: {
    require: true,
    type: String,
  },
})

module.exports={
    usertable
}


