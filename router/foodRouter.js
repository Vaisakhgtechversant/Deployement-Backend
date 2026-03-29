const foodController = require('../controller/foodController')
const userController = require('../controller/userController')
const express = require('express');
const router = express.Router();
console.log('routerrrr');

router.get('/getallfood', foodController.allFoods);
router.post('/addData', foodController.AddFood)
router.delete('/deleteData/:id', foodController.deleteFood)
router.get('/singleData/:id', foodController.gwtSingleData)
router.post('/updateData/:id', foodController.UpdateData)
router.post('/login', userController.login)
router.post('/google-login', userController.googleLogin)




module.exports = router;