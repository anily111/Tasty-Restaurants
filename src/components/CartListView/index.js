import CartItem from '../CartItem'
import TastyKitchensContext from '../../context/TastyKitchensContext'
import './index.css'

const CartListView = () => (
  <TastyKitchensContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <>
          <div className="cart-names-container">
            <p className="cart-name">Item</p>
            <p className="cart-quantity">Quantity</p>
            <p className="cart-price">Price</p>
          </div>
          <ul className="cart-list">
            {cartList.map(eachItem => (
              <CartItem
                key={eachItem.id}
                cartItemDetails={eachItem}
                testid="cartItem"
              />
            ))}
          </ul>
        </>
      )
    }}
  </TastyKitchensContext.Consumer>
)

export default CartListView
