import './Navbar.css'
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext/CartContext';
import { WishlistContext } from '../../Context/WishlistContext/WishlistContext';


function Navbar({View}) {
let {numOfCartItems} = useContext(CartContext)
let {numOfWishlistItems} = useContext(WishlistContext)


    return (
    <>
    <div className="container-fluid border-bottom">
        <div className="row align-items-center justify-content-center py-3 px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
                <a href="" className="text-decoration-none logo">
                    <h1 className="m-0 display-5 font-weight-semi-bold d-flex justify-content-center align-items-center">
                        <span className=" font-weight-bold p-1 mr-1"><i className="fas fa-shopping-cart"></i></span>
                        Fresh Cart
                    </h1>
                </a>
            </div>
            {
                    <>
                    <div className="col-lg-6 col-6 text-left search">
                <form action="">
                    <div className="position-relative d-flex">
                        <input type="text" className="w-100 form-control" placeholder="Search for products"/>
                        <div className="input-group-append end-0">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-lg-3 col-6 text-end heart-cart">
                <Link to='wishlist' href="" className="btn border me-1">
                    <i className="fas fa-heart "></i>
                    <span className="badge text-secondary">{numOfWishlistItems}</span>
                </Link>
                <Link to='cart' href="" className="btn border ms-1">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="badge text-secondary">{numOfCartItems}</span>
                </Link>
            </div>
                </>
            }
        </div>
    </div>
    </>
)
}
export default Navbar