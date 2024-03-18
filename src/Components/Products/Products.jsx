import { useQuery } from 'react-query'
import './Products.css'
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext/UserContext'
import axios from 'axios'
import PageHeader from '../../SubComponents/PageHeader/PageHeader'
import SubnavSidebar from '../../utilities/SubnavSidebar/SubnavSidebar'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext/CartContext'
import { ToastContainer, toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner'
import { WishlistContext } from '../../Context/WishlistContext/WishlistContext'
import { Helmet } from 'react-helmet'


function Products() {
  let {baseUrl} = useContext(UserContext)
  let {addProductCartApi} = useContext(CartContext)
  let {addProductWishlistApi} = useContext(WishlistContext)
  let {data,isLoading} = useQuery('getProduct',getProduct)
// ------------------------------------------------------------------
  async function addProductToCart(productId) {
    const res = await addProductCartApi(productId)
  }
// ------------------------------------------------------------------
  async function addToWishList(productId){
    const res = await addProductWishlistApi(productId) 
    toast.success('Product Added Sucessfully To Wishlist',{
      position: "top-center"
    })
  }
// ------------------------------------------------------------------
  function getProduct(){
    return axios.get(`${baseUrl}/api/v1/products`)
  }
// ------------------------------------------------------------------
return (
    <section id='products'>
      {
         isLoading? <div className='loading'>
         <InfinitySpin
         visible={true}
         width="200"
         color="#4fa94d"
         ariaLabel="infinity-spin-loading"
         />
         </div>:<>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
                <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <div className='container'>
      <SubnavSidebar/>
      </div>
      <PageHeader title='Our-Products'/>
      <div className="container">
      <div className='getProduct row justify-content-center'>
        
        {
          
          data?.data?.data.map((product) => {
            return<div className='getProduct-content col-md-3 g-3' key={product.id}>
                    <div className='text-center d-flex flex-column align-items-center position-relative border'>
                      <div className='product-img'><div className='img-layer'></div><img src={product.imageCover} alt="" /></div>
                    <div className='options'>
                      <div className='wishlist-add' onClick={() => addToWishList(product.id)}>
                        <i className="fa-regular fa-heart"></i>
                      </div>
                      <Link to={`/productdetails/${product._id}`}>
                        <div className='quick-view'>
                          <i className="fa-regular fa-eye"></i>
                        </div>
                      </Link>
                    </div>
                    <div className='cate-name'>{product.category.name}</div>
                    <div className='product-title'>{product.title}</div>
                    <div className='product-price'><span><bdi><span className='me-1'>EGP</span>{product.price}</bdi></span><span className='product-rate'>{product.ratingsAverage}</span><span className='ms-1'><i className='fa fa-star'></i></span></div>
                    <div>
                      <button id='btn1' className='btn my-3' onClick={() =>addProductToCart(product.id)}>add to cart</button>
                    </div>
                    </div>
                  </div>
          })

        }
        <ToastContainer icon={false} stacked />
      </div>
      </div>
         </>
      }
        
    </section>
  )
}

export default Products