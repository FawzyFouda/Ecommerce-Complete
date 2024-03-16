import axios from 'axios'
import { useQuery } from 'react-query'
import { UserContext } from '../../Context/UserContext/UserContext'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SubnavSidebar from '../../utilities/SubnavSidebar/SubnavSidebar'
import PageHeader from '../../SubComponents/PageHeader/PageHeader'
import './CategoryDetails.css'

function CategoryDetails() {
  let [catDetils,setCatDetils] = useState(null)
    let {id} = useParams()
// ------------------------------------------------------
    async function getCategoryDetails(){
        await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`).then(res => {
          setCatDetils(res?.data.data)
        })
    }
    useEffect(() => {
      getCategoryDetails()
    },[])
// ------------------------------------------------------
// let {data} = useQuery('getCatDetails',getCategoryDetails)
// ------------------------------------------------------
  return (
    <section id='categoryDetails'>
    <div className='container'>
    <SubnavSidebar/>
    </div>
    <PageHeader title={`categories > ${catDetils?.name}`}/>
    <div className="container">
      <div className="categorydetails d-flex flex-column align-items-center">
          <div className="my-5"><h1>{catDetils?.name}</h1></div>
          <div className=" categoryImg border"><img src={catDetils?.image} alt={catDetils?.slug} /></div>
      </div>
    </div>
  </section>
  )
}

export default CategoryDetails