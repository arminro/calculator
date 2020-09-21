import React, { Component } from 'react'
import NumberSelection from '../NumberSelection/NumberSelection'
import './NumberPalette.css'

class NumberPalette extends Component {
  render () {
    return (
      <div className='NumberPalette'>
        <div class='calculator__keys'>
          <button class='key--operator' onClick={this.props.handleOperatorClick}>+</button>
          <button class='key--operator' onClick={this.props.handleOperatorClick}>-</button>
          <button class='key--operator' onClick={this.props.handleOperatorClick}>×</button>
          <button class='key--operator' onClick={this.props.handleOperatorClick}>÷</button>
          <button onClick={this.props.handleNumberClick}>7</button>
          <button onClick={this.props.handleNumberClick}>8</button>
          <button onClick={this.props.handleNumberClick}>9</button>
          <button onClick={this.props.handleNumberClick}>4</button>
          <button onClick={this.props.handleNumberClick}>5</button>
          <button onClick={this.props.handleNumberClick}>6</button>
          <button onClick={this.props.handleNumberClick}>1</button>
          <button onClick={this.props.handleNumberClick}>2</button>
          <button onClick={this.props.handleNumberClick}>3</button>
          <button onClick={this.props.handleNumberClick}>0</button>
          <button onClick={this.props.handleNumberClick}>.</button>
          <button onClick={this.props.handleClearClick}>CL</button>
          <button onClick={this.props.handleMemeorySaveClick}>M+</button>
          <button onClick={this.props.handleMemoryLoadClick}>M-</button>
          <button class='key--equal' onClick={this.props.handleEqualClick}>=</button>
        </div>
        <NumberSelection comboData={this.props.comboData} onHandleComboClick={this.props.handleComboClick} />

      </div>
    )
  }
}

export default NumberPalette
