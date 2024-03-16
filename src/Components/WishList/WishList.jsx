
import PageHeader from '../../SubComponents/PageHeader/PageHeader'
import { useContext } from 'react'
import SubnavSidebar from '../../utilities/SubnavSidebar/SubnavSidebar'
import { ToastContainer, toast } from 'react-toastify'
import EmptyCart from '../../utilities/Images/empty-cart.png'
import { Link } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'
import './WishList.css'
import { WishlistContext } from '../../Context/WishlistContext/WishlistContext'
import { CartContext } from '../../Context/CartContext/CartContext'
import emptyImg from '../../utilities/Images/empty-wishlist.jpg'


function WishList() {
  let {wishlistAllProducts,addProductWishlistApi,removeWishlistItemApi,numOfWishlistItems,isLoading} = useContext(WishlistContext)
  let {addProductCartApi} = useContext(CartContext)
// ---------------------------------------------
async function removeItem(productId){
  const res = await removeWishlistItemApi(productId)
  if(res) {
    toast.success('Product Deleted Successfully from', {
      position: "top-center"
    });
  }else{
    toast.error(' Delete Fail')
  }
}
// ---------------------------------------------
async function addProductToCart(productId) {
  const res = await addProductCartApi(productId) 
  toast.success('Product Added Sucessfully To Cart',{
    position: "top-center"
  })
}
// ---------------------------------------------
  return (
    <section id='wishlist'>
      <div className='container'>
      <SubnavSidebar/>
      </div>
      <PageHeader title='WishList'/>
      <section className='container py-5' id='Cart'>
        <div  className='mx-4 WishList-content'>
          <div>
            {
              wishlistAllProducts?.length?
              wishlistAllProducts.map((product) => {
              return<div className='d-flex justify-content-between border-bottom py-2 border-bottom' key={product._id}>
                  <div className='productName d-flex col-md-8 align-items-center justify-content-center'>
                    <span className='col-md-1 removeProduct cursor-pointer' onClick={() => removeItem(product._id)}><i className='fa fa-xmark'></i></span>
                    <div className='col-md-3'><Link to={`/productdetails/${product._id}`}><img className='w-75' src={product.imageCover} alt={product.slug} /></Link></div>
                    <div className='ps-2 col-md-8 productNameText d-flex flex-column align-items-center'>
                    <Link to={`/productdetails/${product._id}`}><h3 className='h6'>{product.title}</h3></Link>
                      <div className='productPrice d-flex align-items-center justify-content-center'>{product.priceAfterDiscount?<><span  className='px-3'>{`EGP ${product.priceAfterDiscount}`}</span><span className=''><del>EGP {product.price}</del></span></>:<span className=''>EGP {product.price}</span> }</div>
                    </div>
                  </div>
                  <div className='productTotalPrice d-flex col-md-4 align-items-center justify-content-center'><button className='addCart' onClick={() => addProductToCart(product._id)}>Add To Cart</button></div>
              </div>
            }) 
            :
            <div className='w-100 d-flex justify-content-center'>
              <img src={emptyImg} alt='wishlistempty' className='py-5'/>
            </div>
            } 
          </div>
        </div>
        <ToastContainer icon={false} stacked />
      </section>
    </section>
  )
}

export default WishList