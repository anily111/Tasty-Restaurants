import './index.css'

const Counter = props => {
  const {quantity, increaseQuantity, decreaseQuantity} = props

  const increaseButtonClicked = () => {
    increaseQuantity()
  }

  const decreaseButtonClicked = () => {
    decreaseQuantity()
  }
  return (
    <div className="counter-container">
      <button
        type="button"
        onClick={decreaseButtonClicked}
        className="decrease-button"
        data-testid="decrement-count"
      >
        -
      </button>
      <div className="quantity" data-testid="active-count">
        {quantity}
      </div>
      <button
        type="button"
        onClick={increaseButtonClicked}
        className="decrease-button"
        data-testid="increment-count"
      >
        +
      </button>
    </div>
  )
}

export default Counter
