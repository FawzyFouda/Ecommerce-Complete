
import axios from 'axios'
import Sidebar from '../../Sidebar/Sidebar'
import Subnav from '../Subnav/Subnav'
import './Brands.css'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import PageHeader from '../../SubComponents/PageHeader/PageHeader'
import { Helmet } from 'react-helmet'

function Brands() {
  function getAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {data} = useQuery('getBrands',getAllBrands)
  return (  
    <section id='brands'>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Brands</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <div className='container'>
      <div className="row m-0">
        <div className="col-lg-3 p-0">
          <Sidebar sidebarhiddenClass={'opacity-none'}/>
        </div>
        <div className="col-lg-9">
          <Subnav/>
        </div>
        <PageHeader title={`Brands`}/>
        <div className='row  g-5'>
          {
            data?.data.data.map((brand) =>{
              return<Link to={`/brandDetails/${brand._id}`}  className='col-md-4' key={brand._id}>
                  <div className='brand-content border d-flex flex-column align-items-center'>
                    <div className='my-5'><h2>{brand.name}</h2></div>
                    <div className=' start-0 end-0'><img src={brand.image} alt={brand.slug} /></div>
                  </div>
              </Link>
            })
          }
        </div>
      </div>
      </div>
      
    </section>
  )
}

export default Brands