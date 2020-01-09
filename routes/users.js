const express = require('express')

const User = require('../model/user.model')

let router = express.Router()


router.post('/', (req, res) => {
    console.log('POST METHOD')
    console.log(req.body)
    //validação
    if(!req.body.password){
        return res.status(400).json({
            message: 'A User must to be set'
        })
    }

    let user = new User (req.body)
    user.save()
    .then((user) =>{

        res.status(200).json({
            user: user
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message || 'At least the Email must be set.'
        })
    })

})


// nada foi criado aqui

// listando todos os usuários

router.get('/listAllUsers', (req, res) => {
    
    User.find()
    .then(users=>{
        res.json(users)
    }).catch(err=>{
        res.status(500).json({
            message:err.message || 'At least the Email must be set.'
        })
    })
})

// Achando um
// http://localhost:3001/users/user/email@live.com
router.get('/user/:email', (req, res) => {

    let obj = {
        email: req.params.email
    }
    User.findOne(obj)
    .then(user=>{
        if(!user){
            res.status(404).json({
                message: 'user not found'
            })
        }
        res.status(200).json(user)
    }).catch(err=>{
        res.status(500).json({
            message:err.message || 'At least the Email must be set.'
        })
    })
})






// Achando um
// http://localhost:3001/users/
router.put('/', (req, res) => {

    let obj = {
        email: req.body.email
    }
    User.findOneAndUpdate(obj, req.body)
    .then(user=>{
        if(!user){
            res.status(404).json({
                message: 'user not found'
            })
        }
        res.status(200).json(user)
    }).catch(err=>{
        res.status(500).json({
            message:err.message || 'Something is wrong.'
        })
    })
})


// Achando um e deletando
// http://localhost:3001/users/
router.delete('/', (req, res) => {

    let obj = {
        email: req.body.email
    }
    User.findOneAndDelete(obj, req.body)
    .then(user=>{
        if(!user){
            res.status(404).json({
                message: 'user not found'
            })
        }
        res.status(200).json(user)
    }).catch(err=>{
        res.status(500).json({
            message:err.message || 'Something is wrong.'
        })
    })
})



module.exports = router