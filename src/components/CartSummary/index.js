import {FaRupeeSign} from 'react-icons/fa'
import TastyKitchensContext from '../../context/TastyKitchensContext'
import './index.css'

const CartSummary = props => {
  const {placeOrderClicked} = props

  const clickedPlaceOrder = () => {
    placeOrderClicked()
  }
  return (
    <TastyKitchensContext.Consumer>
      {value => {
        const {cartList} = value
        let ordersTotalPrice = 0
        cartList.forEach(eachCartItem => {
          ordersTotalPrice += eachCartItem.cost * eachCartItem.quantity
        })
        return (
          <div className="order-summary-container">
            <h1 className="order-total-heading">Order Total:</h1>
            <div className="price-order-button-container">
              <p className="orders-total-price" data-testid="total-price">
                <FaRupeeSign /> {ordersTotalPrice}
              </p>
              <button
                type="button"
                className="place-order-button"
                onClick={clickedPlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        )
      }}
    </TastyKitchensContext.Consumer>
  )
}

export default CartSummary
