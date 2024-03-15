const { Router } = require('express')
const { getExcelFile } = require('../Controllers/excel.file.controller')
const route = Router()


route.post('/', getExcelFile)

module.exports = route  