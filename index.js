const express = require ('express')
const parser = require ('body-parser')
const mongoose = require('mongoose')

const config = require('./config')
const app = express()
mongoose.Promise = global.Promise
mongoose.connect(config.dbUrl, {
    userNewUrlParser: true
}).then(()=>{
    console.log(`Connect to mongodb at ${config.dbUrl}`)
})

//parse de requisições com content-type usando application/json
app.use(parser.json())


const usersRoute = require('./routes/users')

app.use('/users', usersRoute)

app.get('/', (req, res) =>{
    res.json({
        message: 'veja isso e va p rota de users'
    })
} )

const PORT = 3001
app.listen(PORT, () => {
    console.log(`api server running on port${PORT}`)
});