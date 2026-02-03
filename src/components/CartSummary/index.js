// Write your code here
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const total = cartList.reduce(
        (acc, each) => acc + each.price * each.quantity,
        0,
      )
      return (
        <div>
          <h1>Order Total: Rs{total}/-</h1>
          <p>{cartList.length} items in cart</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
