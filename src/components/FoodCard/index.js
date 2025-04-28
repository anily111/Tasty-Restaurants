import {Component} from 'react'
import {FaRupeeSign, FaStar} from 'react-icons/fa'
import TastyKitchensContext from '../../context/TastyKitchensContext'
import Counter from '../Counter'
import './index.css'

class FoodCard extends Component {
  state = {
    quantity: 0,
  }

  increaseQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  decreaseQuantity = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  render() {
    const {foodDetails, rating} = this.props
    const {quantity} = this.state
    const {id, name, cost, imageUrl} = foodDetails
    return (
      <TastyKitchensContext.Consumer>
        {value => {
          const {addCartItem} = value

          const addButtonClicked = () => {
            addCartItem({...foodDetails, quantity})
          }
          return (
            <li className="food-item" key={id} data-testid="foodItem">
              <img src={imageUrl} alt="foodItem" className="food-image" />
              <div className="food-details-container">
                <h1 className="food-name">{name}</h1>
                <div className="rupee-container">
                  <FaRupeeSign />
                  <p className="food-cost">{cost}</p>
                </div>
                <div className="food-rating-container">
                  <FaStar className="rating-icon" />
                  <p className="food-name">{rating}</p>
                </div>
                <Counter
                  quantity={quantity}
                  increaseQuantity={this.increaseQuantity}
                  decreaseQuantity={this.decreaseQuantity}
                />
                {quantity > 0 && (
                  <button
                    type="button"
                    className="add-button"
                    onClick={addButtonClicked}
                  >
                    Add
                  </button>
                )}
              </div>
            </li>
          )
        }}
      </TastyKitchensContext.Consumer>
    )
  }
}

export default FoodCard
