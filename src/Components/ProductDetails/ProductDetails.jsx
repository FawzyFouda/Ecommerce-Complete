import { useQuery } from 'react-query'
import './ProductDetails.css'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext/UserContext'
import SubnavSidebar from '../../utilities/SubnavSidebar/SubnavSidebar'
import PageHeader from '../../SubComponents/PageHeader/PageHeader'
import { CartContext } from '../../Context/CartContext/CartContext'
import { ToastContainer, toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner'

function ProductDetails() {
  let [imageId,setImageId] = useState(null)
  let {baseUrl} = useContext(UserContext)
  let {addProductCartApi} = useContext(CartContext)

  let {id} = useParams()

  // -----------------------------------
  function getProductDetails(Id){
    return axios.get(`${baseUrl}/api/v1/products/${Id}`)
  }
  // -----------------------------------
  function addToWishList(e){
    e.target.classList.toggle('fa-solid')
  }
  // -----------------------------------
  function changeImage(idx){
    setImageId(idx)
  }
  // ---------------------------------------------
  async function addProductToCart(productId) {
    const res = await addProductCartApi(productId) 
  }
  // ---------------------------------------------
iop
// ---------------------------------------------
  let {data,isLoading} = useQuery('getProductDetails',() => getProductDetails(id))
  console.log(data)
  return (
    <section id='productDetails'>
      {
        isLoading?
        <div className='loading'>
          <div><InfinitySpin
        visible={true}
        width="100%"
        height='100%'
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
        /></div>
        </div>:<>
          <div className='container'>
      <SubnavSidebar/>
      </div>
      <PageHeader title={data?.data.data.title} cat={data?.data.data.category.name}/>
      <div className="container">
        
          <div className='productDetailsContent d-flex my-5 justify-content-between'>
          <div className='productImage col-md-4 d-flex flex-column justify-content-center border p-2'>
            <div className='mainImg'>
              <img className='w-100' src={imageId?data?.data.data.images[imageId]:data?.data.data.imageCover} alt={data?.data.data.slug} />
            </div>
            <div className='subImges d-flex justify-content-center mt-2'>
              {
                data?.data.data.images.map((image, idx) => {
                  return<div className='col-md-2 cursor-pointer' onClick={() => changeImage(idx)} key={idx}>
                      <img className='w-100' src={image} alt={data?.data.data.slug} />
                    </div>
                })
              }
            </div>
            </div>
          <div className='infos mt-5 col-md-7'>
            <div className='title'><h2>{data?.data.data.title}</h2></div>
            <div className='border-bottom brand mb-2'><span className=''>Brands:</span><span className='me-5'>{data?.data.data.brand.name}</span></div>
            <div className='mb-2 price'><span className='me-3'>EGP{data?.data.data.priceAfterDiscount}</span><span className='pricebefor'><del>EGP{data?.data.data.price}</del></span> </div>
            <div className='mb-2'><p className='mb-2'>{data?.data.data.description}</p> <span className='d-flex justify-content-start align-items-center'><span>{data?.data.data.ratingsAverage}</span><span className='me-5 ms-1'><i className='fa fa-star'></i> </span><span className='ratingQuantity'>({data?.data.data.ratingsQuantity}reviews)</span></span></div>
            <div>Sold: {data?.data.data.sold}</div>
            <div className='editButtons d-flex align-items-center'>
              <div className='my-3 editCounter me-5'>
                <button>+</button>
                  0
                <button>-</button>
              </div>
              <button className='my-3 addCart' onClick={() => addProductToCart(data?.data.data._id)}><i className='fa fa-cart-shopping pe-2'></i>add to cart</button></div>
              <div>
                <button className='fw-bold addwishlist btn d-flex align-items-center p-0 mb-2'><i className='fa-regular fa-heart me-2' onClick={(e) =>addToWishList(e)}></i>add to wishlist</button>
              </div>
              <div className='catDetails'>Categories: <span className='global-color-lighter'>{data?.data.data.category.name}</span></div>
              <div className='update'>updated: <span className='global-color-lighter'>{data?.data.data.updatedAt}</span></div>
            </div>
        </div>
        
      </div>
      <ToastContainer icon={false} stacked />
        </>
      }
    </section>
  )
}

export default ProductDetails