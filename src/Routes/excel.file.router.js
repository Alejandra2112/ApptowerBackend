const { Router } = require('express')
const { getExcelFile } = require('../Controllers/excel.file.controller')
const route = Router()


route.get('/', getExcelFile)

module.exports = route  