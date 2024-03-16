
import Sidebar from '../../Sidebar/Sidebar'
import PageHeader from '../../SubComponents/PageHeader/PageHeader'
import Subnav from '../Subnav/Subnav'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import './Checkout.css'
import { CartContext } from '../../Context/CartContext/CartContext'
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import * as Yup from 'yup';



function Checkout() {
 let nav = useNavigate() 
 let [loading,setLoading] = useState(false)
 let [startVal,setStartVal] = useState(null)
  let {cartId,clearCartApi} = useContext(CartContext)

  let validationSchema = Yup.object({
    details: Yup.string().required('details is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/gm,'phone is invalid').required('Phone is required'),
    city: Yup.string().required('city is required'),
  });
  
  async function cashPayment(val){
    setLoading(true)
    setStartVal('cash')
    await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,val,{headers:{token:localStorage.getItem('userToken')}}).then(res => {
        if(res.data.status == 'success'){
          clearCartApi()
          toast.success('Payment Completed Sucessfully',{
            position: "top-center"
          })
          setLoading(false)
          setInterval(() =>{
            nav('/')
          },1500)
        }
    }).catch(err => {
      setLoading(false)
      console.log(err)
    }
      )
}
  async function checkoutSession(val){
    setLoading(true)
    await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,val,{headers:{token:localStorage.getItem('userToken')}},
    {params:{url:'http://localhost:3000'}}
    ).then(res => {
        if(res.data.status == 'success'){
          window.open(res.data.session.url,'_self')
        }
        console.log(res)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    }
      )
}
  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    validationSchema
    ,
    onSubmit:() =>{
      if(startVal == 'cash'){
        cashPayment()
      }else{
        checkoutSession()
      }
    }
  })
  return (
    <section id='checkout'>
      <div className='container'>
      <div className="row m-0">
        <div className="col-lg-3 p-0">
          <Sidebar sidebarhiddenClass={'opacity-none'}/>
        </div>
        <div className="col-lg-9">
          <Subnav/>
        </div>
      </div>
      </div>
      <PageHeader title='Checkout'/>
      <div className="w-75 mx-auto">
          <div className='container'>
            <form className="ng-pristine ng-invalid ng-touched" onSubmit={formik.handleSubmit}>
                  <label htmlFor="details">Details</label>
                  <input type="text" id="details" className="form-control mb-3 ng-pristine ng-invalid ng-touched" name='details' value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  {formik.errors.details && formik.touched.details?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.details}</div>:''}
                  <label htmlFor="phone">phone</label>
                  <input className='form-control mb-2' type="tel" name='phone' value={formik.values.phone} onChange={formik.handleChange} id='phone' onBlur={formik.handleBlur}/>                
                  {formik.errors.phone && formik.touched.phone?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.phone}</div>:''}
                  <label htmlFor="city">city</label>
                  <input type="text" id="city" value={formik.values.city} onChange={formik.handleChange} className="form-control mb-3 ng-untouched ng-pristine ng-invalid" name='city' onBlur={formik.handleBlur}/>
                  {formik.errors.city && formik.touched.city?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.city}</div>:''}
                  <div className='d-flex justify-content-evenly'>
                    <button className="btn btn-outline-info  my-5 col-md-3" type='submit' onClick={cashPayment}>
                    {
                      loading?<div class="spinner-border text-white me-2" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>:''
                    }
                      Cash Payment
                      </button>
                    <button className="btn btn-outline-info my-5 col-md-3" type='submit' onClick={checkoutSession}>
                    {
                      loading?<div class="spinner-border text-white me-2" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>:''
                    }
                      Checkout Session
                      </button>
                  </div>
              </form>
          </div>
          <ToastContainer icon={false} stacked />
      </div>
    </section>
  )
}

export default Checkout