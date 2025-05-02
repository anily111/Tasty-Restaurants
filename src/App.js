import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import TastyKitchensContext from './context/TastyKitchensContext'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import SpecificRestaurent from './components/SpecificRestaurent'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class App extends Component {
  state = {
    cartItemsList: [],
  }

  componentDidMount() {
    const storedCartList = localStorage.getItem('cartData')
    if (storedCartList) {
      this.setState({cartItemsList: JSON.parse(storedCartList)})
    }
  }

  componentDidUpdate() {
    const {cartItemsList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartItemsList))
  }

  incrementCartItemQuantity = id => {
    const {cartItemsList} = this.state
    const updatedCartListDetails = cartItemsList.map(eachCartItemDetails => {
      if (eachCartItemDetails.id === id) {
        return {
          ...eachCartItemDetails,
          quantity: eachCartItemDetails.quantity + 1,
        }
      }
      return eachCartItemDetails
    })
    this.setState({cartItemsList: updatedCartListDetails})
  }

  decrementCartItemQuantity = id => {
    const {cartItemsList} = this.state
    const productObject = cartItemsList.find(
      eachCartItem => eachCartItem.id === id,
    )
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartItemsList: prevState.cartItemsList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartItemsList: []})
  }

  removeCartItem = id => {
    const {cartItemsList} = this.state
    const updatedCartList = cartItemsList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartItemsList: updatedCartList})
  }

  addCartItem = foodItem => {
    const {cartItemsList} = this.state
    const foodObject = cartItemsList.find(
      eachCartItem => eachCartItem.id === foodItem.id,
    )

    if (foodObject) {
      this.setState(prevState => ({
        cartItemsList: prevState.cartItemsList.map(eachCartItem => {
          if (foodObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + foodItem.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartItemsList, foodItem]

      this.setState({cartItemsList: updatedCartList})
    }
  }

  render() {
    const {cartItemsList} = this.state
    return (
      <TastyKitchensContext.Provider
        value={{
          cartList: cartItemsList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={SpecificRestaurent}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </TastyKitchensContext.Provider>
    )
  }
}

export default App
