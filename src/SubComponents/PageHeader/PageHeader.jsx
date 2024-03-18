import { Link } from 'react-router-dom'
import './PageHeader.css'

function PageHeader({title,cat}) {
  return (
    <>
        <div className="page-header mb-5">
          <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="font-weight-semi-bold text-capitalize mb-3 fs-4 d-flex align-items-center">{cat} <i className="fa-solid fa-chevron-right ms-2"></i> <span className='title ms-2'>{title}</span></div>
          </div>
      </div>
    </>
  )
}

export default PageHeader