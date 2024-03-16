
import './Categories.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'

function Categories() {

// ------------------------------------------------------
  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {data, isLoading} = useQuery('getCate',getCategories)
console.log(data)

  return (
    <div id="categories">
        <div className='d-flex flex-wrap w-100'>
          {
            isLoading?<InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
            />:
            data?.data?.data?.map((cat) =>{
              return<>
                    <Link to={`/categoryDetails/${cat._id}`} className='catCard  col-md-4 position-relative p-0 px-3  my-3 cursor-pointer d-block'>
                      <div className='catimg overflow-hidden border '>
                        <img src={cat.image} alt={cat.slug} className=' w-100 h-100'/>
                      </div>
                      <div className='border py-2 text-center position-absolute bottom-0 bg-light start-0 end-0 mx-3'>
                        <h2>{cat.name}</h2>
                      </div>
                    </Link>
                </>
            })
          
          }
        </div>
    </div>
  )
}

export default Categories