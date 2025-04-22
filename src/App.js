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
    const storedCartList = localStorage.getItem('cartList')
    if (storedCartList) {
      this.setState({cartItemsList: JSON.parse(storedCartList)})
    }
  }

  componentDidUpdate() {
    const {cartList} = this.state
    localStorage.setItem('cartList', JSON.stringify(cartList))
  }

  incrementCartItemQuantity = id => {}

  decrementCartItemQuantity = id => {}

  removeAllCartItems = () => {}

  removeCartItem = id => {}

  addCartItem = foodItem => {}

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
