import {Component} from 'react'
import {Link} from 'react-router-dom'
import TastyKitchensContext from '../../context/TastyKitchensContext'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class Cart extends Component {
  state = {
    isPlaceOrderClicked: false,
  }

  placeOrderClicked = () => {
    this.setState({isPlaceOrderClicked: true})
  }

  render() {
    const {isPlaceOrderClicked} = this.state
    return (
      <TastyKitchensContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value

          const paymentSuccessfulView = () => (
            <div className="payment-container">
              <img
                src="https://res.cloudinary.com/dri7jmdgw/image/upload/v1745823813/check-circle.1_1_dks8an.png"
                className="payment-success-image"
              />
              <h1 className="payment-successful">Payment Successful</h1>
              <p className="payment-description">
                Thank you for ordering <br /> Your payment is successfully
                completed.
              </p>
              <Link to="/" className="go-to-home-link">
                <button className="go-to-home-button">Go To Home Page</button>
              </Link>
            </div>
          )

          const removeAllButtonClicked = () => {
            removeAllCartItems()
          }

          const cartListView = () => {
            const showEmptyView = cartList.length === 0
            console.log(showEmptyView)
            if (showEmptyView) {
              return <EmptyCartView />
            }
            return (
              <>
                <div className="cart-list-container">
                  <div className="cart-remove-all-container">
                    <h1 className="cart-heading">My Cart</h1>
                    <button
                      type="button"
                      className="remove-all-button"
                      onClick={removeAllButtonClicked}
                    >
                      Remove All
                    </button>
                  </div>
                  <div className="cart-list-summary">
                    <CartListView />
                    <hr className="cart-horizontal-line" />
                    <CartSummary placeOrderClicked={this.placeOrderClicked} />
                  </div>
                </div>
                <Footer />
              </>
            )
          }
          return (
            <>
              <Header activePage="cart" />
              <div className="cart-content-container">
                {isPlaceOrderClicked ? paymentSuccessfulView() : cartListView()}
              </div>
            </>
          )
        }}
      </TastyKitchensContext.Consumer>
    )
  }
}

export default Cart
