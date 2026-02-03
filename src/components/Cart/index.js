import {Component} from 'react'
import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'
import PaymentPopup from '../PaymentPopup'

import './index.css'

class Cart extends Component {
  state = {showPaymentPopup: false}

  openPopup = () => {
    this.setState({showPaymentPopup: true})
  }

  closePopup = () => {
    this.setState({showPaymentPopup: false})
  }

  render() {
    const {showPaymentPopup} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
          const showEmptyView = cartList.length === 0

          const onRemoveAllCartItems = () => {
            removeAllCartItems()
          }

          return (
            <>
              <Header />
              <div className="cart-container">
                {showEmptyView ? (
                  <EmptyCartView />
                ) : (
                  <div className="cart-content-container">
                    <h1 className="cart-heading">My Cart</h1>

                    <button
                      className="button"
                      type="button"
                      onClick={onRemoveAllCartItems}
                    >
                      Remove All
                    </button>

                    <CartListView />
                    <div className="checkout">
                      <CartSummary onCheckout={this.openPopup} />
                    </div>

                    {showPaymentPopup && (
                      <PaymentPopup closePopup={this.closePopup} />
                    )}
                  </div>
                )}
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
