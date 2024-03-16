import Sidebar from '../../Sidebar/Sidebar'
import Categories from '../../SubComponents/Categories/Categories'
import Slider from '../../SubComponents/Slider/Slider'
import Subnav from '../Subnav/Subnav'
import './Home.css'

function Home({sidebarhiddenClass}) {
  return (
    <section id='home'>
      <div className='container'>
      <div className="row m-0">
        <div className="col-lg-3 p-0">
          <Sidebar sidebarhiddenClass={sidebarhiddenClass}/>
        </div>
        <div className="col-lg-9">
          <Subnav/>
          <Slider/>
        </div>
      </div>
      <Categories/>
      </div>
    </section>
  )
}

export default Home