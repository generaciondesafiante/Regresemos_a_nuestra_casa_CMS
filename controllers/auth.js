const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { triggerJWT } = require("../helpers/jwt");
const { sendPasswordResetEmail } = require("../middlewares/validate-email-reset-password");
const jwt = require("jsonwebtoken");
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
            user.phone
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
            user.phone
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
    const { _id, ...resto } = req.body;

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: "put API - UsuarioPut",
        id,
        user,
    });
};

const changePassword = async (req, res = response) => {
    const { id } = req.params;
    const { password } = req.body; // Nueva contraseña

    try {
        // Validar si el usuario existe (puedes agregar más validaciones aquí)
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Generar el hash de la nueva contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Actualizar la contraseña del usuario
        user.password = hashedPassword;
        await user.save();

        // Aquí puedes realizar otras acciones, como enviar un correo electrónico o generar un token JWT si es necesario

        res.json({
            msg: "Contraseña actualizada exitosamente",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                // ... otros campos del usuario que quieras incluir
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la contraseña' });
    }
};

const emailUserPasswordForget = async (req, res = response) => {
    const { id } = req.params;

    const { email } = req.body;

    try {
        let user = await User.findOne({ email });
        const token = await triggerJWT(
            user.id,
            user.name,
            user.email,
            user.ciy,
            user.country,
            user.lastname,
            user.phone
        );
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El usario no existe con ese email",
            });
        }
        const resetToken = jwt.sign({ userId: id }, 'secret_key', { expiresIn: '1h' });
        await sendPasswordResetEmail(user.email, resetToken);
        //*Generar nuestro Jwt
        res.json({
            ok: true,
            uid: user.id,
            token
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
    changePassword
};
