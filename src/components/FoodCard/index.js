import {Component} from 'react'
import {FaRupeeSign, FaStar} from 'react-icons/fa'
import TastyKitchensContext from '../../context/TastyKitchensContext'
import Counter from '../Counter'
import './index.css'

class FoodCard extends Component {
  state = {
    quantity: 0,
    isAddClicked: false,
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
    const {quantity, isAddClicked} = this.state
    const {id, name, cost, imageUrl} = foodDetails
    return (
      <TastyKitchensContext.Consumer>
        {value => {
          const {addCartItem} = value

          const addButtonClicked = () => {
            if (quantity > 0) {
              addCartItem({...foodDetails, quantity})
            } else {
              this.setState(prevState => ({quantity: prevState.quantity + 1}))
            }
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
                  <FaStar
                    className="rating-icon"
                    color="#ffcc00"
                    width="14px"
                    height="14px"
                  />
                  <p className="food-name">{rating}</p>
                </div>
                {quantity > 0 && (
                  <Counter
                    quantity={quantity}
                    increaseQuantity={this.increaseQuantity}
                    decreaseQuantity={this.decreaseQuantity}
                  />
                )}
                <button
                  type="button"
                  className="add-button"
                  onClick={addButtonClicked}
                >
                  Add
                </button>
              </div>
            </li>
          )
        }}
      </TastyKitchensContext.Consumer>
    )
  }
}

export default FoodCard
