import {Component} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdCloseCircle} from 'react-icons/io'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {
    isHamburgerClicked: false,
  }

  logoutClicked = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  hamburgerMenuClicked = () => {
    this.setState(prevState => ({
      isHamburgerClicked: !prevState.isHamburgerClicked,
    }))
  }

  render() {
    const {activePage} = this.props
    const homeActiveClass =
      activePage === 'home' ? 'header-logo-link-home' : 'header-logo-link-cart'
    const cartActiveClass =
      activePage === 'cart' ? 'header-logo-link-home' : 'header-logo-link-cart'
    const {isHamburgerClicked} = this.state
    return (
      <nav className="navbar">
        <div className="header-top">
          <div className="logo-name-container">
            <Link to="/" className="header-logo-link">
              <img
                src="https://res.cloudinary.com/dri7jmdgw/image/upload/v1744783340/Frame_274_feb5b4.png"
                className="header-logo"
                alt="website logo"
              />
            </Link>
            <h1 className="header-heading">Tasty Kitchens</h1>
          </div>

          <div className="links-logout-container">
            <ul className="header-links-list-desktop">
              <li className="header-list-item">
                <Link to="/" className={homeActiveClass}>
                  Home
                </Link>
              </li>
              <li className="header-list-item">
                <Link to="/cart" className={cartActiveClass}>
                  Cart
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-button"
              onClick={this.logoutClicked}
            >
              Logout
            </button>
          </div>

          <button
            className="hamburger-button"
            onClick={this.hamburgerMenuClicked}
          >
            <GiHamburgerMenu />
          </button>
        </div>

        {isHamburgerClicked && (
          <div className="menu-items-container">
            <div className="menu-list-logout">
              <ul className="menu-links-container">
                <li className="menu-list-item">
                  <Link to="/" className="menu-logo-link-home">
                    Home
                  </Link>
                </li>
                <li className="menu-list-item">
                  <Link to="/cart" className="menu-logo-link-cart">
                    Cart
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="logout-button"
                onClick={this.logoutClicked}
              >
                Logout
              </button>
            </div>

            <button
              className="close-button"
              type="button"
              onClick={this.hamburgerMenuClicked}
            >
              <IoMdCloseCircle className="close-icon" />
            </button>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
