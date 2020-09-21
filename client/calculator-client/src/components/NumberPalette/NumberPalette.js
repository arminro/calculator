import React, { Component } from 'react'
import NumberSelection from '../NumberSelection/NumberSelection'
import './NumberPalette.css'

class NumberPalette extends Component {
  render () {
    return (
      <div className='NumberPalette'>
        <div class='container '>

          <div class='row mb-5'>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleNumberClick}>
                    7
              </button>

            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleNumberClick}>
                    8
              </button>
            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleNumberClick}>
                    9
              </button>
            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc op-button' onClick={this.props.handleOperatorClick}>
                    +
              </button>
            </div>
          </div>
          <div class='row mb-5'>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleNumberClick}>
                    4
              </button>
            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleNumberClick}>
                    5
              </button>
            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleNumberClick}>
                    6
              </button>
            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc op-button' onClick={this.props.handleOperatorClick}>
                    -
              </button>
            </div>
          </div>
          <div class='row mb-5'>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleNumberClick}>
                    1
              </button>
            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleNumberClick}>
                    2
              </button>
            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleNumberClick}>
                    3
              </button>
            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc op-button' onClick={this.props.handleOperatorClick}>
                    ×
              </button>
            </div>
          </div>
          <div class='row mb-5'>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleNumberClick}>
                    0
              </button>
            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleNumberClick}>
                    .
              </button>
            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleClearClick}>
                    CL
              </button>
            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc op-button' onClick={this.props.handleOperatorClick}>
              ÷
              </button>
            </div>
          </div>
          <div class='row mb-5'>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleEqualClick}>
                    =
              </button>
            </div>
            <div class='col-sm'>
              <button type='button' class='btn btn-primary calc number-button' onClick={this.props.handleMemeorySaveClick}>
                    M+
              </button>
            </div>
            <div class='col-sm'>
              <button
                type='button' class='btn btn-primary calc number-button'
                onClick={this.props.handleMemoryLoadClick}
              >
                      M-
              </button>
              <NumberSelection comboData={this.props.comboData} onHandleComboClick={this.props.handleComboClick} 
              />
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default NumberPalette
