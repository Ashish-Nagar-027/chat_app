const mongoose = require('mongoose');

const connect = async () => {

    try {
    await mongoose.connect('mongodb+srv://ashishnagar033:Chat_App_Password@cluster0.m6c4jll.mongodb.net/')
    } catch (error) {
        console.log(error)
    }

}


module.exports = connect