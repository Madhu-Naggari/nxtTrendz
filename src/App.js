import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = item => {
    this.setState(prevState => {
      const existingItem = prevState.cartList.find(each => each.id === item.id)

      if (existingItem) {
        return {
          cartList: prevState.cartList.map(each =>
            each.id === item.id
              ? {...each, quantity: each.quantity + item.quantity}
              : each,
          ),
        }
      }

      return {
        cartList: [...prevState.cartList, {...item}],
      }
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each =>
        each.id === id ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(each =>
          each.id === id ? {...each, quantity: each.quantity - 1} : each,
        )
        .filter(each => each.quantity > 0),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
