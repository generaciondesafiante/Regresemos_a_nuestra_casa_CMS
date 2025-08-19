const { Router } = require("express");
const createUser = require("../routes/auth/createUser");
const userInformation = require("../routes/auth/userInformation");
const loginUser = require("../routes/auth/loginUser");
const revalidateToken = require("../routes/auth/revalidateToken");
const updateUser = require("../routes/auth/updateUser");
const validateEmail = require("../routes/auth/validateEmail");
const validatePassword = require("../routes/auth/validatePassword");


const router = Router();

router.use(createUser);
router.use(userInformation);
router.use(loginUser);
router.use(revalidateToken);
router.use(updateUser);
router.use(validateEmail);
router.use(validatePassword);

module.exports = router;