import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from '../../models';


const port = 9999
const context = require('../../models')

const app = express()
app.listen(port,
  console.log(`Server listening on port ${port}`))

// app.get('/', (req, res) => {
//     res.send("asd")
// });


app.use(
  cors(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json()
)

export const saveNumber = async number => {
  return context.Operand.create(number)
}

export const getNumbersForCalc = async calcId => {
  return context.Operand.findAll(
    {
      where: {
        calcId: calcId
      }
    })
}


app.post('/numbers/save', async (req, res) => {
  const number = req.body
  console.log(number);
  const newNumber = await saveNumber(number);
  res.status(201).send(newNumber);
})

app.get('/numbers/:id', async (req, res) => {
  const calcId = req.params.id;
  const result = await getNumbersForCalc(calcId);
  if (result.length > 0) {
    console.log(`result: ${result}`);
    return res.status(200).send(result)
  }

  return res.status(404).send()

})
