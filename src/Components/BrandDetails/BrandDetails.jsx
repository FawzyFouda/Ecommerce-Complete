import PageHeader from "../../SubComponents/PageHeader/PageHeader"
import SubnavSidebar from "../../utilities/SubnavSidebar/SubnavSidebar"
import axios from "axios"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import './BrandDetails.css'
function BrandDetails() {
    let {id} = useParams()
    
    function getBrandDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    }
    let {data} = useQuery('getBrandDetails',getBrandDetails)
    console.log(data)
  return (
    <section id='brandDetails'>
      <div className='container'>
      <SubnavSidebar/>
      </div>
      <PageHeader title={`Brands > ${data?.data.data.name}`}/>
      <div className="container">
        <div className="branddetails d-flex flex-column align-items-center">
            <div className="my-5"><h1>{data?.data.data.name}</h1></div>
            <div className=" brandImg border"><img src={data?.data.data.image} alt={data?.data.data.slug} /></div>
        </div>
      </div>
    </section>
  )
}

export default BrandDetails