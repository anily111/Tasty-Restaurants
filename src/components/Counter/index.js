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
      >
        -
      </button>
      <div className="quantity">{quantity}</div>
      <button
        type="button"
        onClick={increaseButtonClicked}
        className="decrease-button"
      >
        +
      </button>
    </div>
  )
}

export default Counter
