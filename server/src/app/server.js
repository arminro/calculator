import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { log } from 'console'

const path = require('path')

const context = require('../../models')
const config = require(path.join(__dirname, '../../config/config.json'))

const port = 9999
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()
const winston = require('winston')

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // easier to check the end-result
    new winston.transports.Console({ filename: 'error.log', level: 'error' })
  ]
})

app.listen(port,
  console.log(`Server listening on port ${port}`))

app.use(
  cors(corsOptions), // we dont need to enable pre-flight for this solution, as there are no delete/put methods in use
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json()
)

const saveOperand = (number) => {
  console.log(number);
  const numberValue = parseFloat(number.value)
  console.log(numberValue)
  if (isNaN(numberValue)) {
    throw new Error('Number to be saved must be a valid float!')
  }

  return context.Operand.create(number);
}

const getOperandsForCalculation = (calcId) => {
  return context.Operand.findAll(
    {
      where: {
        calcId: calcId
      }
    })
}

app.options('*', cors())
app.post('/numbers/save', async (req, res) => {
  try {
    const number = req.body
    const newNumber = await saveOperand(number)
    res.status(201).send(newNumber)
  } catch (error) {
    const errors = compileAndLogErrors(res, error)
    res.status(500).json(errors)
  }
})

app.get('/numbers/:id', async (req, res, next) => {
  try {
    const calcId = req.params.id
    const result = await getOperandsForCalculation(calcId)
    if (result.length > 0) {
      return res.status(200).send(result)
    }

    return res.status(404).send()
  } catch (error) {
    const errors = compileAndLogErrors(res, error)
    res.status(500).json(errors)
  }
})

app.use(function (err, req, res, next) {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  return res.status(err.statusCode).json({
    status: err.status,
    message: `Could not process the request: ${err.message}`
  })
})

function compileAndLogErrors (res, error) {
  const errors = []
  if (error.name && error.name.toLowerCase().includes('sequelize')) {
    error.errors.forEach(err => {
      const flatError = {
        name: err.name,
        message: err.message
      }
      errors.push(flatError)
    })
  } else {
    errors.push({
      name: error.name,
      message: error.message
    })
  }
  logger.error({
    time: new Date().toDateString(),
    errors: errors
  })
  return errors
}
