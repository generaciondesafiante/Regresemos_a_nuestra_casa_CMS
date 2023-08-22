const { response } = require("express");
const Course = require("../models/Course");


const coursesData = async (req, res = response) => {


    try {
        let course = await Course.find();
        res.json({
            ok: true,
            course,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al acceder a los cursos",
        });
    }
};
module.exports = {
    coursesData,
};
