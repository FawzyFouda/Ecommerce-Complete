import { Link, useNavigate } from 'react-router-dom'
import './Protected.css'

function Protected(props) {
  let navigate = useNavigate()
  function closeMessage(){
    navigate ('/')
    
  }
  if(localStorage.getItem('userToken') !== null){
    return props.children
  } else {
    return <>
      <div id='protected'>
        <div className='layer'>
          <span className='position-absolute top-0 mt-3 end-0 me-4 cursor-pointer fs-5' onClick={closeMessage}><i class="fa-solid fa-xmark text-light"></i></span>
        <h2>{props.TargetName !== 'Checkout'? `Login first to access ${props.TargetName}`:`Login first to ${props.TargetName}`}</h2>
        <div>
          <Link to='/signin'>login</Link>
          <span className='d-block'>or</span>
          <Link to='/signup'>Register</Link>
        </div>
        </div>
      </div>
    </>
  }
  
}

export default Protected