const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: false,
    },
});

module.exports = model("User", UserSchema);
