import Subnav from "../../Components/Subnav/Subnav"
import Sidebar from "../../Sidebar/Sidebar"

function SubnavSidebar() {
  return (
    <>
        <div className="row m-0 align-items-center">
        <div className="col-lg-3 p-0">
          <Sidebar sidebarhiddenClass={'opacity-none'}/>
        </div>
        <div className="col-lg-9">
          <Subnav/>
        </div>
      </div>
    </>
  )
}

export default SubnavSidebar