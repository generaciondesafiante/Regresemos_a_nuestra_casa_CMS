
const mongoose = require('mongoose')

const dbConection = async() => {
    try {
        
       await mongoose.connect(process.env.db_cnn);

        console.log('Db online')


    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar base de datos')
    }
}


module.exports = {
    dbConection
}