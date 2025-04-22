import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userName: '',
    passWord: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passWord: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userName, passWord} = this.state
    const userDetails = {
      username: userName,
      password: passWord,
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserNameField = () => {
    const {userName} = this.state
    return (
      <div className="username-container">
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          value={userName}
          id="username"
          className="username-field"
          placeholder="Username"
          onChange={this.onChangeUserName}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {passWord} = this.state
    return (
      <div className="password-container">
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          value={passWord}
          id="password"
          className="username-field"
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      ;<Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          src="https://res-console.cloudinary.com/dri7jmdgw/thumbnails/v1/image/upload/v1744782035/UmVjdGFuZ2xlXzE0NTdfb2h5eW9r/preview"
          className="tasty-kitchens-image-mobile"
          alt="website logo"
        />
        <img
          src="https://res-console.cloudinary.com/dri7jmdgw/thumbnails/v1/image/upload/v1744786401/UmVjdGFuZ2xlXzE0NTZfZmg4bG1z/preview"
          className="tasty-kitchens-image-desktop"
          alt="website-logo"
        />

        <form className="login-details-container" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/dri7jmdgw/image/upload/v1744783340/Frame_274_feb5b4.png"
            className="login-landing-image"
            alt="website login"
          />
          <p className="tasty-kitchens-heading">Tasty Kitchens</p>
          <h1 className="login">Login</h1>
          {this.renderUserNameField()}
          {this.renderPasswordField()}
          {showSubmitError && <p className="error-message">{errorMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
