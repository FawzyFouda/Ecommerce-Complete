import { useFormik } from 'formik'
import './Signup.css'
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../../SubComponents/PageHeader/PageHeader';
import * as Yup from 'yup';
import Bg1 from '../../../utilities/Images/bg-01.jpg'
function Signup() {
  let [signupResponse,setSignupResponse] = useState(null)
  let [loding,setLoding] = useState(false)
  let navigate = useNavigate()

  let validationSchema = Yup.object({
    name: Yup.string().min(3, 'name minlength is 3').max(10, 'name maxlength is 10').required('name is required'),
    email: Yup.string().email('email not valid').required('email is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/gm,'phone is invalid').required('Phone is required'),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character:').required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')],'rePassword not match with password').required('rePassword is required'),
  });

  async function Register(val){
    setLoding(true)
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,val)
    .then(res => {
    
    if(res.data.message == "success"){
      setSignupResponse('Register success')
      navigate('/signup')
      console.log(res.data)
      setLoding(false)
    }
  }
    ).catch(err => {
      if(err.response.data.statusMsg == 'fail')
      setSignupResponse(err.response.data.message)
      setLoding(false)
      console.log(err.response.data.message)
    })
    
    
    
  }

const formik = useFormik({
  initialValues:{
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":""
  },
  validationSchema,
  onSubmit:Register
})
  return (
  <section className='limiter py-5'>
    <div className='container'>
        <div className="content wrap-login100 m-auto  my-5 border">
          <div className="login100-form-title" style={{backgroundImage: `url(${Bg1})`}}>
            <span className="login100-form-title-1">
              Sign up
            </span>
          </div>
          <form action="#"  onSubmit={formik.handleSubmit} className='login100-form validate-form'>
            <div className="wrap-input100 validate-input m-b-26">
              <label htmlFor="name" className='label-input100'>name:</label>
              <input type="text" className='input100' placeholder="Enter your username" id='name' name='name' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
            </div>
            {formik.errors.name && formik.touched.name?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.name}</div>:''}
            <div className="wrap-input100 validate-input m-b-26">
              <label htmlFor="email" className='label-input100'>Email:</label>
              <input type="email" className='input100' placeholder="Enter your email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
            </div>
            {formik.errors.email && formik.touched.email?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div>:''}
            <div className="wrap-input100 validate-input m-b-26">
              <label htmlFor="phone" className='label-input100'>Phone:</label>
              <input type="phone" className='input100'  placeholder="Enter your phone" id='phone' name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
            </div>
            {formik.errors.phone && formik.touched.phone?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.phone}</div>:''}
            <div className="wrap-input100 validate-input m-b-26">
              <label htmlFor="password" className='label-input100'>Password:</label>
              <input type="password" className='input100' placeholder="Enter your Password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
            </div>
            {formik.errors.password && formik.touched.password?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div>:''}
            <div className="wrap-input100 validate-input m-b-26">
              <label htmlFor="rePassword" className='label-input100'>Re Pass:</label>
              <input type="password" className='input100' placeholder="Enter your rePassword" id='rePassword' name='rePassword' onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur}/>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.rePassword}</div>:''}
            <div className={`py-4 ${signupResponse == 'Account Already Exists'? 'text-danger': 'text-success'}`}>{signupResponse}</div>
            <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  {
                    loding?<div class="spinner-border text-white me-2" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>:''
                  }
                  Register
                </button>
                {
                  loding? <span className='ms-2'>
                  <i className='fa-solid fa-spinner fa-spin text-light'></i>
                  </span>:null
                }
                <div>
							    <Link to='/signin'  onClick= "window.open('index.html','_self')">Or login</Link>
					      </div>
					</div>
          </form>
      </div>
    </div>
  </section>
    
  )
}

export default Signup



