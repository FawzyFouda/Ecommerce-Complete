import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Subnav.css'
import { UserContext } from '../../Context/UserContext/UserContext'
import { useContext } from 'react'
import profile from '../../utilities/Images/profilee.png'
import { CartContext } from '../../Context/CartContext/CartContext'

function Subnav() {
    let navigate = useNavigate()
    let {setUserToken} = useContext(UserContext)
    let {userToken,userName} = useContext(UserContext) 
    

    function Logout(){
        localStorage.removeItem('userToken')
        setUserToken(null)
        navigate('/')

    }   

    return (
    <>
        {
            <div className="container-fluid">
            <nav className="row pt-3 pb-3 align-items-center">
                <div className="">
                    <div className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 ">
                        <a href="" className="text-decoration-none d-block d-lg-none">
                            <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                        </a>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse pages-links row justify-content-between align-items-center w-100" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0 col-md-10">
                                <NavLink to='/'  className="nav-item nav-link">Home</NavLink>
                                <NavLink to='/cart'  className="nav-item nav-link">Carts</NavLink>
                                <NavLink to='/products' className="nav-item nav-link">Products</NavLink>
                                <NavLink to='/brands' className="nav-item nav-link">Brands</NavLink>
                            </div>
                            {
                                !userToken?  <ul className='d-flex justify-content-end col-md-2 '>
                                <li><Link to='/signin' href="" className="btn ms-1 ">Login</Link></li>
                                <li><Link to='/signup' href="" className="btn  ms-1">SignUp</Link></li>
                            </ul>:<div className='profile d-flex  justify-content-end col-md-2 '>
                                <div className='col-md-3'>
                                    <img className='w-100' src={profile} alt="" />
                                </div>
                                <div className='userName col-md-4 d-flex align-items-center'>
                                    <h3 className='h6 mb-0 ms-2'>{userName}</h3>
                                </div>
                                <div className='logout col-md-4 d-flex align-items-center mx-3'>
                                    <span className='cursor-pointer' onClick={Logout}><i className="fa-solid fa-arrow-right-from-bracket ms-4"></i></span>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div> 
        }
    </>
)
}

export default Subnav