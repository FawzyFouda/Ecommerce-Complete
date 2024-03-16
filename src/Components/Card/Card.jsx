import { AiFillStar } from "react-icons/ai";
import { BsFillBagCheckFill  } from "react-icons/bs";
import './Card.css'

function Card({img,title,star,reviews,newPrice,prevPrice}) {
  return (
    <>
      <div className="card-s col-lg-3">
            <div className="card-content h-100 p-3 border bg-light">
              <div className='product-img pb-3'>
                <img  src={img} alt='' className="card-img" />
              </div>
              <div className="card-details">
                <h3 className="card-title ps-3 fs-4">{title}</h3>
                <div className="card-reviews ps-3 d-flex align-items-center ">
                  {star}{star}{star}{star}
                  <span className="total-reviews ps-3">{reviews}</span>
                </div>
                <div className="card-price row pt-3 pb-3">
                  <div className="price col-6 d-flex align-items-center justify-content-center">
                    <del className="pe-2">{prevPrice}</del> {newPrice}
                  </div>
                  <div className="bag col-6 d-flex align-items-center justify-content-center">
                    <BsFillBagCheckFill  className="bag-icon " />
                  </div>
                </div>
              </div>
            </div>
      </div>
    </>
  )
}

export default Card