import React, { Component } from 'react'
import './CalcScreen.css'

class CalcScreen extends Component {
  render () {
    return (
      <div className='App'>
        <div clas='container'>
          <div class='d-flex flex-column screen'>
            <div class='p-0'>
              <div class='jumbotron align-text-bottom screen-element' id='screenElement'>
                {this.props.screenText}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CalcScreen
