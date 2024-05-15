require('dotenv').config({path: './config.env'})

const app = require('./server')

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT} port`)
})
// sequelize.authenticate().then(()=>{
//     console.log('DB connected')
// }).catch((err=>{
//     console.log(err)
// }))

// sequelize.sync({al})