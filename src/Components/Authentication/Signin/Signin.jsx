import './Signin.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext/UserContext';
import Bg1 from '../../../utilities/Images/bg-01.jpg'

function Signin() {
  let [SigninResponse,setSigninResponse] = useState(null)
  let [loading,setLoading] = useState(false)
  let navigate = useNavigate()
  let {setUserToken,setUserName} =useContext(UserContext)


  async function Login(val){
    setLoading(true)
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,val).then(res =>{
      if(res.data.message == "success"){
        setUserToken(res.data.token)
        setSigninResponse('succes')
        localStorage.setItem('userToken',res.data.token)
        setUserName(res.data.user.name)
        navigate('/')
        setLoading(false)
      }
    })
    .catch((err) => {
      if(err.response.data.statusMsg == 'fail')
      setSigninResponse(err.response.data.message)
      setLoading(false)
    })
    
  }
  const formik = useFormik({
    initialValues:{
      "email":"",
      "password":"",
    },
    onSubmit:Login
  })
  return (
  <section className='limiter py-5'>
    <div className='container'>
        <div className="content wrap-login100 m-auto  my-5 border">
          <div className="login100-form-title" style={{backgroundImage: `url(${Bg1})`}}>
            <span className="login100-form-title-1">
              Sign In
            </span>
          </div>
          <form action="#"  onSubmit={formik.handleSubmit} className='login100-form validate-form'>
            <div className="wrap-input100 validate-input m-b-26">
              <label htmlFor="email" className='label-input100'>Email:</label>
              <input type="email" className='input100' placeholder="Enter your email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} />
            </div>
            {formik.errors.email && formik.touched.email?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div>:''}
            <div className="wrap-input100 validate-input m-b-26">
              <label htmlFor="password" className='label-input100'>Password:</label>
              <input type="password" className='input100' placeholder="Enter your Password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} />
            </div>
            {formik.errors.password && formik.touched.password?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div>:''}
            <div className={`py-4 ${SigninResponse == 'Incorrect email or password'? 'text-danger': 'text-success'}`}>{SigninResponse}</div>
            <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  {
                    loading?<div class="spinner-border text-white me-2" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>:''
                  }
                  Sign In
                </button>
                <div>
							    <Link to='/signup'  onClick= "window.open('index.html','_self')">Or Register</Link>
					      </div>
					  </div>
          </form>
      </div>
    </div>
  </section>
  )
}

export default Signin