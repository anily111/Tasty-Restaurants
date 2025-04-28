import {FaRupeeSign} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import TastyKitchensContext from '../../context/TastyKitchensContext'
import './index.css'

const CartItem = props => (
  <TastyKitchensContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value

      const {cartItemDetails} = props
      const {id, name, cost, quantity, imageUrl} = cartItemDetails

      const onRemoveCartItem = () => {
        removeCartItem(id)
      }

      const increaseItemQuantity = () => {
        incrementCartItemQuantity(id)
      }

      const decreaseItemQuantity = () => {
        decrementCartItemQuantity(id)
      }

      return (
        <li data-testid="cartItem" className="cart-item" key={id}>
          <img src={imageUrl} className="cart-item-image" />
          <div className="cart-item-details">
            <h1 className="cart-item-name">{name}</h1>
            <div className="counter-container">
              <button
                type="button"
                onClick={decreaseItemQuantity}
                className="decrease-button"
                data-testid="decrement-quantity"
              >
                -
              </button>
              <div className="quantity" data-testid="item-quantity">
                {quantity}
              </div>
              <button
                type="button"
                onClick={increaseItemQuantity}
                className="decrease-button"
                data-testid="increment-quantity"
              >
                +
              </button>
            </div>
            <div className="cost-remove-container">
              <p className="cart-item-cost">
                <FaRupeeSign /> {cost}
              </p>
              <button
                className="delete-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                <AiFillCloseCircle color="#616E7C" size={20} />
              </button>
            </div>
          </div>
        </li>
      )
    }}
  </TastyKitchensContext.Consumer>
)

export default CartItem
