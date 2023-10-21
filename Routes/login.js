const {Router} = require ('express')
const route = Router()
const {logIn} = require ('../Controllers/login')
const verifityToken = require('../Middlewares/verifityToken')
const User = require('../Models/user')

route.post('/', logIn)

route.get('/access', verifityToken, (req, res) => {
    const user = req.user;
    const rol = user.rol;
  
    if (rol == 1) {
      console.log("Es administrador");
    } else if (rol == 2) {
      console.log("Es residente");
    } else {
      console.log("Es vigilante");
    }
  });
 
module.exports = route