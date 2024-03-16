import { useContext } from 'react'
import './Button1.css'
import { CartContext } from '../../Context/CartContext/CartContext'
function Button1({productId}) {
  let {addProductCart} = useContext(CartContext)

  return (
    <button id='btn1' className='btn my-3' onClick={() =>addProductCart(productId)}>add to cart</button>
  )
}

export default Button1
