import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    errorMsg: '',
    showErrorMsg: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  loginFunction = async event => {
    const {username, password} = this.state
    event.preventDefault()
    // console.log('Login Success')
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      //   console.log(response)
      this.setState({errorMsg: data.error_msg, showErrorMsg: true})
    }
  }

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    // console.log(errorMsg)

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      //   console.log('jwt_token', jwtToken)
      //   console.log('Redirect')
      return <Redirect to="/" />
    }

    return (
      <div className="login_bg_container">
        <form
          className="form_container p-3 text-light"
          onSubmit={this.loginFunction}
        >
          <div className="text-center mb-3">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">USERNAME</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Username"
              onChange={this.changeUserName}
              value={username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={this.changePassword}
              value={password}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {showErrorMsg && (
            <p id="emailHelp" className="text-danger form-text ">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    )
  }
}

export default Login
