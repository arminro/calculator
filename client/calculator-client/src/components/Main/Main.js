import React, { Component } from 'react'
import CalcScreen from '../CalcScreen/CalcScreen'
import NumberPalette from '../NumberPalette/NumberPalette'
import './Main.css'
import axios from 'axios'

class Main extends Component {
  constructor () {
    super()
    this.state = {
      calculatorText: '',
      operator: null,
      comboData: [] 
    }
    this.operandMapping = {
        '+': (a, b) => a+b,
        '×': (a, b) => a*b,
        '-': (a, b) => a-b,
        '÷': (a, b) => a/b,
    };
    this.saveSessionId(new Date().getTime()); // a timespecific id used to identify the calc session
  }


  clickNumberButton  = (eve) => {
    this.setState({
        calculatorText: `${this.state.calculatorText}${eve.currentTarget.textContent}`
      })
  }

  clickOperatorButton =  (eve) => {
    try {
      const operatorText = eve.currentTarget.textContent;
      if(!this.state.operator){
        this.setState({
          operator: operatorText,
          calculatorText: `${this.state.calculatorText}${operatorText}`
        })
      }
      else{
        const operationResult = this.calculateOperationOrThrowError(this)
        this.setState({
          calculatorText: `${operationResult}${operatorText}`,
          operator: operatorText
        })       
      }
    } catch (error) {
      this.handleError()
    }
  
  }

  getSessionId = () => {
    return sessionStorage.getItem('CALC_ID');
  }

  saveSessionId = (id) =>{
      if (sessionStorage.getItem('CALC_ID') === null){
          sessionStorage.setItem('CALC_ID', id)
      }
  }

  clickEqualButton = ()  => {
    try {
      const res = this.calculateOperationOrThrowError(this)
      this.setState({
        calculatorText: res,
        operator: null
      })    
    } catch (error) {
      this.handleError(error);
    }
 
  }



  clickMemorySaveButton =  () => {
        // save the nlast number to be entered
        try {
          const calcId = this.getSessionId();
          if (!calcId){
              throw new Error('No session identifier defined');
          }

          const number = this.getLastNumber();
          axios({
            method: 'post',
            url: `${this.resolveServerUrl()}/numbers/save`,
            data: {
              "value": number,
              "calcId": calcId
            }
          })
          .then((result) => {
            // todo: handle success
          })
          .catch(err => {
            this.handleError(err);
          })
        } catch (error) {
            this.handleError(error);
        }
      
  }

  getLastNumber = () => {
    //debugger
    let lastElement = null;
    const text = this.state.calculatorText
    if(!text){
      throw new Error('Cannot save empty element!');
    }
    if(this.state.operator){
      const operatorIdx = text.lastIndexOf(this.state.operator);
      const numberString = text.substring(operatorIdx+1, text.length);
      lastElement = parseFloat(numberString);
      if (isNaN(lastElement)){
        throw new Error('Cannot save empty element!');
      } 
      }
      else{
        lastElement = parseFloat(text);
      }
      
      return lastElement;
  }

  clickMemoryLoadButton = async() => {
    try {
        const calcId = this.getSessionId();
        if (!calcId){
          throw new Error('No session identifier defined');
        }
        const data = await axios.get(`${this.resolveServerUrl()}/numbers/${calcId}`); // array
        this.setState({
          comboData: data.data.map(n=>n.value)
        })  
    } catch (error) {
      this.handleError(error);
    }
  }

  resolveServerUrl = () => {
    return 'http://localhost:9999';
  }
  clickClearButton = () => {
    this.setState({
      calculatorText: '',
      operator: null
    })  
  }

  setComboVisible = () => {
    this.setState({
      comboVisible: true
    })  
  }


  
  captureSelectedComboElement = (elem) => {
    this.setState({
      comboVisible: false,
      comboData: [],
      calculatorText: `${this.state.calculatorText}${elem.target.value}`
    })  
  }

  handleError = (error) => {
    this.setState({
      calculatorText: 'Error'
    })
  }

  calculateOperationOrThrowError(context) {
    const res = context.state.calculatorText.split(context.state.operator);
    if (res.length < 2) {
      throw new Error("All operators are binary!");
    }

    return context.operandMapping[context.state.operator](parseFloat(res[0]), parseFloat(res[1]));
  }

    checkIfValidOrThrowError(availableOperands, operandString) {
        if(!operandString){
            throw new Error('The operation cannot be empty!')
        }
        let contains = true

        availableOperands.forEach(operator => {
            contains += operandString.includes(operator)
        })
        if(!contains){
            throw new Error('The operation to perform does not contain operators!')
        }
    }



  render () {
    return (
      <div className='Main'>
        <CalcScreen screenText={this.state.calculatorText} />
        <NumberPalette comboData={this.state.comboData}
                handleNumberClick={this.clickNumberButton}
                handleEqualClick={this.clickEqualButton}
                handleOperatorClick={this.clickOperatorButton}
                handleClearClick={this.clickClearButton}
                handleMemeorySaveClick={this.clickMemorySaveButton}
                handleMemoryLoadClick={this.clickMemoryLoadButton}
                handleComboClick={this.captureSelectedComboElement}
                />
      </div>
    )
  }
}

export default Main
