import React, { Component } from 'react'
import './CalcScreen.css'

class CalcScreen extends Component {
  render () {
    return (
      <div className='CalcScreen'>
        {/* <div clas='container'>
          <div class='row mb-5'>
            <div class='col-sm'>
              <div class='d-flex flex-column screen'>
                <div class='jumbotron align-text-bottom' id='screenElement'>
                  {this.props.screenText}
                </div>
              </div>
            </div>
          </div>

        </div> */}

        <div class='calculator__display'>{this.props.screenText}</div>

      </div>
    )
  }
}

export default CalcScreen
