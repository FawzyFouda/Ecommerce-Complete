import './Slider.css'
import slider1 from '../../utilities/Images/6596.jpg'
import slider2 from '../../utilities/Images/slider2.webp'
function Slider() {
  return (
    <>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" >
      <img src={slider1} className="d-block w-100" alt="..." style={{height:'410px'}}/>
    </div>
    <div className="carousel-item" >
      <img src={slider2} className="d-block w-100" alt="..." style={{height:'410px'}}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </>
  )
}

export default Slider