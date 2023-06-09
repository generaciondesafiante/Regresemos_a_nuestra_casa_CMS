const { response } = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const { triggerJWT } = require("../helpers/jwt");

//Todo: register

const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "Un usuario ya existe con este correo",
            });
        }

        user = new User(req.body);

        //encrypt password with bcryptjs
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //* trigger jwt
        const token = await triggerJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

//todo: Login

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El usario no existe con ese email",
            });
        }

        //* confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password incorrecto",
            });
        }

        //*Generar nuestro Jwt

        const token = await triggerJWT(user.id, user.name, user.email);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

//todo: renew token

const revalidateToken = async (req, res = response) => {
    // const {email, name, password} = (req.body)

    const { name, uid, email } = req;

    //* generar un nuevo JWT y retornarlo en esta petircion
    const token = await triggerJWT(uid, name, email);

    res.json({
        ok: true,
        uid,
        name,
        email,
        token,
    });
};

module.exports = {
    createUser,
    loginUser,
    revalidateToken,
};
