import { useEffect, useState } from 'react'
import './CategoryLinks.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

function CategoryLinks({sidebarhiddenClass}) {
    const [category , setCategory] = useState([])
// ------------------------------------------------------
    async function getCategories(){
        let result = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategory(result.data.data)
    }
    useEffect(()=> {
        getCategories()
    },[])
// ------------------------------------------------------
    function categoryBtn(){
        document.getElementById('dropdown-list').classList.toggle('opacity-none')
        }
        return (
        <> 
            <div className=" sidebar-category d-none d-lg-block">
                    <div className='position-relative'>
                        <button className="btn btn-secondary" type="button" onClick={categoryBtn}>
                        Categories
                        </button>
                        <ul className={`${sidebarhiddenClass} dropdown-list position-absolute m-0 `} id='dropdown-list'>
                            {
                                category.map((ele) => {
                                    return(
                                        <li key={ele._id}>
                                            <Link  to={`/categoryDetails/${ele._id}`} href="#">{ele.name}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
        </>
    )
}

export default CategoryLinks