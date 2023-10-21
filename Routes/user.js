const {Router} = require ('express')
const route = Router()
const {getUser, postUser, putUser, deleteUser} = require ('../Controllers/user')

route.get('/', getUser)
route.post('/', postUser)
route.put('/', putUser)
route.delete('/', deleteUser)

module.exports = route  