import React, { Component } from 'react'
import './NumberSelection.css'

class NumberSelection extends Component {
  render () {
    return this.props.comboData.length > 0 ? (
      <div class='container'>

        <select onChange={this.props.onHandleComboClick} value='' class='combo'>
          <option value='' selected disabled hidden>Choose</option>
          {
            this.props.comboData.map((number, index) => (
              <option key={index}>{number}</option>
            ))
          }
        </select>
      </div>
    ) : null
  }
}

export default NumberSelection
