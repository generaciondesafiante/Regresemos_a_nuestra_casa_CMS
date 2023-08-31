const { response } = require("express");
const bcrypt = require("bcryptjs");
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
        const token = await triggerJWT(
            user.id,
            user.name,
            user.lastname,
            user.country,
            user.city,
            user.phone,
            user.image,
        );

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            lastname: user.lastname,
            country: user.country,
            city: user.city,
            phone: user.phone,
            image: user.image,
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

        const token = await triggerJWT(
            user.id,
            user.name,
            user.email,
            user.ciy,
            user.country,
            user.lastname,
            user.phone,
            user.image,
        );

        res.json({
            ok: true,
            uid: user.id,
            lastname: user.lastname,
            name: user.name,
            email: user.email,
            city: user.city,
            country: user.country,
            phone: user.phone,
            image: user.image,
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
    const { name, email, uid, city, lastname, phone, country } = req;

    //* generar un nuevo JWT y retornarlo en esta petircion
    const token = await triggerJWT(
        name,
        email,
        uid,
        city,
        country,
        phone,
        lastname
    );

    res.json({
        ok: true,
        uid,
        name,
        email,
        city,
        lastname,
        country,
        phone,
        token,
    });
};
const editInformationUser = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, ...resto } = req.body;

    // todo validar contra base de datos
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: "put API - UsuarioPut",
        id,
        user,
    });
};

const emailUserPasswordForget = async (req, res = response) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El usario no existe con ese email",
            });
        }
        //*Generar nuestro Jwt
        res.json({
            ok: true,
            uid: user.id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};
module.exports = {
    createUser,
    loginUser,
    revalidateToken,
    editInformationUser,
    emailUserPasswordForget,
};
