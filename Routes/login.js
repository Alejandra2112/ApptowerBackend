const {Router} = require ('express')
const route = Router()
const {iniciarSesion} = require ('../Controllers/login')
const verificarToken = require('../middlewares/verificarToken')
const Usuario = require('../Models/usuario')

route.post('/', iniciarSesion)

route.get('/acceso', verificarToken, (req, res) => {
    const usuario = req.usuario;
    const rol = usuario.rol;
  
    if (rol == 1) {
      console.log("Es administrador");
    } else if (rol == 2) {
      console.log("Es residente");
    } else {
      console.log("Es vigilante");
    }
  });
  


module.exports = route