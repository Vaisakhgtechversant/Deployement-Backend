const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/food')

const foods=mongoose.model('foods',{
    id:String,
    fname:String,
    price:Number,
    available:Boolean
})

module.exports={
    foods
}