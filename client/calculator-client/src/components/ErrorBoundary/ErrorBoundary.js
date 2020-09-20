// based on: https://stackoverflow.com/questions/36897434/error-handling-in-react-best-practices
import { Component } from 'react'
class ErrorBoundary extends Component {
  constructor () {
    super()
    this.state = {
      hasError: false,
      msg: ''
    }
  }

  componentDidCatch (error) {
    this.setState({
      hasError: true,
      msg: error.message
    })
  }
}
export default ErrorBoundary
