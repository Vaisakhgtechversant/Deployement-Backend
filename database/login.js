const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/food')

const logins=mongoose.model('logins',{
    id:String,
    email:String,
    password:String,
})

module.exports={
    logins
}