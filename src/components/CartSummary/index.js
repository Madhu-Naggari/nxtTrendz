import CartContext from '../../context/CartContext'

const CartSummary = props => {
  const {onCheckout} = props

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const total = cartList.reduce(
          (acc, each) => acc + each.price * each.quantity,
          0,
        )

        const itemsCount = cartList.length

        return (
          <div className="cart-summary-container">
            <h1>Order Total: Rs {total}/-</h1>
            <p>{itemsCount} items in cart</p>

            <button className="button" type="button" onClick={onCheckout}>
              Checkout
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
