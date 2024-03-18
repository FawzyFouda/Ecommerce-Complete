import { useContext } from 'react'
import PageHeader from '../../SubComponents/PageHeader/PageHeader'
import SubnavSidebar from '../../utilities/SubnavSidebar/SubnavSidebar'
import './Cart.css'
import { CartContext } from '../../Context/CartContext/CartContext'
import { ToastContainer, toast } from 'react-toastify'
import EmptyCart from '../../utilities/Images/empty-cart.png'
import { Link } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'

function Cart() {
  let {cartAllProducts,cartTotalCartPrice,UpdateCartItemApi,removeCartItemApi,clearCartApi,isLoading} = useContext(CartContext)
// ---------------------------------------------
async function removeItem(productId){
  const res = await removeCartItemApi(productId)
  if(res) {
    toast.success('Product Deleted Successfully From Cart', {
      position: "top-center"
    });
  }else{
    toast.error('Product Cart Deleted Faild')
  }
}
// ---------------------------------------------
async function clearCart(){
  const res = await clearCartApi()
  if(res) {
    toast.success('Cart List Cleared Successfully', {
      position: "top-center"
    });
  }else{
    toast.error(' Product Cart Cleared Faild')
  }
}
// ---------------------------------------------
async function updateItem(productId,count){
  const res =  await UpdateCartItemApi(productId,count)
  if(res) {
    toast.success('Product Updated Successfully', {
      position: "top-center"
    });
  }else{
    toast.error(' Product Cart Updated Faild')
  }
}
// ---------------------------------------------

// ---------------------------------------------
  return (
    <section id='cart'>
      {
        isLoading?
        <div className='loading'>
            <InfinitySpin
        visible={true}
        width="100%"
        height='100%'
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
        />
        </div>:<>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <div className='container'>
      <SubnavSidebar/>
      </div>
      <PageHeader title='cart'/>
      {
         <div className='container-fluid py-5' id='Cart'>
        <div  className={`d-flex mx-4 ${cartAllProducts?.length?'justify-content-between':'justify-content-center'}`}>
          <div className='left col-md-7'>
            {
              cartAllProducts?.length?<div className='d-flex justify-content-between  border-bottom  border-top py-4'>
              <div className='d-flex col-md-5 align-items-center justify-content-center'>PRODUCT</div>
              <div className='d-flex col-md-1 align-items-center justify-content-center'>PRICE</div>
              <div className='d-flex col-md-2 align-items-center justify-content-center'>QUANTITY</div>
              <div className='d-flex col-md-2 align-items-center justify-content-center'>SUBTOTAL</div>
            </div>:''
            }
            
            {
              

              cartAllProducts?.length?
            cartAllProducts.map((product) => {
              return<div className='d-flex justify-content-between border-bottom py-2' key={product._id}>
                  <div className='productName d-flex col-md-5 align-items-center justify-content-center'><span className='col-md-1 removeProduct cursor-pointer' onClick={() => removeItem(product.product.id)}><i className='fa fa-xmark'></i></span><div className='col-md-5'><img className='w-100' src={product.product.imageCover} alt="" /></div><div className='ps-2 col-md-6 productNameText cursor-pointer'>{product.product.title}</div></div>
                  <div className='productPrice d-flex col-md-1 align-items-center justify-content-center'><div className=''>EGP {product.price}</div></div>
                  <div className='productCount d-flex col-md-2 align-items-center justify-content-center'><div className='border d-flex py-2'><button className={`decrease ${product.count == 1?'bg-n':''}`} disabled={product.count == 1} onClick={() => updateItem(product.product._id,product.count - 1)}>-</button>{product.count}<button className='increase'  onClick={() => updateItem(product.product._id,product.count + 1)}>+</button></div></div>
                  <div className='productTotalPrice d-flex col-md-2 align-items-center justify-content-center'>EGP {product.count}</div>
              </div>
            }) 
            :
            <div className='emptyCart d-flex flex-column align-items-center justify-content-between border-bottom py-2'>
              <div className='d-flex col-md-5 align-items-center justify-content-center'>
                <img src={EmptyCart} alt="empty cart" className='w-100'/>
              </div >
              <div className=' d-flex align-items-center justify-content-center'>
                <h3 className='h6'>Your cart is currently empty</h3>
              </div>
              <Link to='/products'>
                <div className=' d-flex align-items-center justify-content-center'>
                  <button className='btn'>Return To Shop</button>
                </div>
              </Link>
            </div>
            }
          <div className={`my-5 justify-content-center ${cartAllProducts?.length? 'd-flex':'d-none'}`}><button className='clear' onClick={clearCart}>Clear Cart</button></div>
          </div>
            {
                cartAllProducts?.length?<div className='right col-md-4'>
                <h3 className='cartTotal border-bottom py-3'>Cart totals</h3>
              <div className='cartSubtotal border-bottom py-4 d-flex justify-content-between'>
                <div>Subtotal</div>
                <div>{cartTotalCartPrice}</div>
              </div>
              <div className='total d-flex justify-content-between border-bottom py-4'>
                <div>Total</div>
                <div>{cartTotalCartPrice}</div>
              </div>
              <Link to='/checkout'><div className='my-5 d-flex justify-content-center'><button className='checkout'>Check out</button></div></Link>
            </div>:''
            }
          
        </div>
        <ToastContainer icon={false} stacked />
      </div>
      }
        </>
      }
       
      
    </section>
  )
}
export default Cart
