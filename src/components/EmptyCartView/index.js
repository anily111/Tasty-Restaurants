import {Link} from 'react-router-dom'
import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dri7jmdgw/image/upload/v1745835010/cooking_1_ufplmx.png"
      alt="empty cart"
      className="empty-cart-image"
    />
    <h1 className="no-orders-heading">No Order Yet!</h1>
    <p className="empty-cart-description">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/" className="empty-cart-link">
      <button className="order-now-button">Order Now</button>
    </Link>
  </div>
)

export default EmptyCartView
