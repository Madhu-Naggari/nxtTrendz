import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

class PaymentPopup extends Component {
  state = {
    paymentMethod: '',
    isOrderPlaced: false,
  }

  onChangePayment = event => {
    this.setState({paymentMethod: event.target.value})
  }

  confirmOrder = () => {
    this.setState({isOrderPlaced: true})
  }

  render() {
    const {closePopup} = this.props
    const {paymentMethod, isOrderPlaced} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value

          const itemsCount = cartList.reduce(
            (sum, item) => sum + item.quantity,
            0,
          )

          const totalPrice = cartList.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          )

          const closeAndClear = () => {
            removeAllCartItems()
            closePopup()
          }

          return (
            <div className="popup-overlay" role="dialog">
              <div className="popup-container">
                {isOrderPlaced ? (
                  <>
                    <h2 className="success-text">
                      Your order has been placed successfully
                    </h2>
                    <button type="button" onClick={closeAndClear}>
                      Close
                    </button>
                  </>
                ) : (
                  <>
                    <h2>Payment Method</h2>

                    <div className="payment-options">
                      <label>
                        <input type="radio" disabled />
                        Card
                      </label>
                      <label>
                        <input type="radio" disabled />
                        Net Banking
                      </label>
                      <label>
                        <input type="radio" disabled />
                        UPI
                      </label>
                      <label>
                        <input type="radio" disabled />
                        Wallet
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="COD"
                          onChange={this.onChangePayment}
                        />
                        Cash on Delivery
                      </label>
                    </div>

                    <div className="summary">
                      <p>Items: {itemsCount}</p>
                      <p>Total Price: ₹{totalPrice}</p>
                    </div>

                    <button
                      type="button"
                      disabled={paymentMethod !== 'COD'}
                      onClick={this.confirmOrder}
                    >
                      Confirm Order
                    </button>

                    <button type="button" onClick={closePopup}>
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default PaymentPopup
