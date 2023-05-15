const {response} = require('express')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const Usuario = require('../models/Usuario')
const {generarJWT} = require('../helpers/jwt')

//Todo: register

const crearUsuario = async(req, res = response) => {
   
    const {email,  password} = (req.body)
    try {
        
        let usuario = await Usuario.findOne({ email })

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con este correo'
            })
        }
        
        usuario = new Usuario( req.body )
        
        
        //Encriptar contraseña con bcryptjs
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt )
        
        
        await usuario.save()
        
        //* generar jwt
        const token = await generarJWT( usuario.id, usuario.name)
    
        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        })
    }

}



//todo: Login

const loginUsuario = async(req, res = response) => {
   
    const {email, password} = (req.body)
    
    try {

        let usuario = await Usuario.findOne({ email })

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usario no existe con ese email'
            })
        }

        //* confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password)

        if ( !validPassword) {
            return res.status(400).json({
                ok: false,
                msg:'Password incorrecto'
            })
        }

        //*Generar nuestro Jwt
        
        const token = await generarJWT( usuario.id, usuario.name, usuario.email)



        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        })
    }



//    return res.status(201).json({
//         ok: true,
//         msg:'login',
//         email,
//         password
//     })
}

//todo: renew token

const revalidarToken = async(req, res = response) => {
   
    // const {email, name, password} = (req.body)

    const {name, uid,email} = req
  
    //* generar un nuevo JWT y retornarlo en esta petircion
    const token = await generarJWT( uid,name,email)

    res.json({
        ok: true,
        uid,name,email,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}