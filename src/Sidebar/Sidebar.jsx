import CategoryLinks from "./CategoryLinks/CategoryLinks"
import "./Sidebar.css"

function Sidebar({categories,sidebarhiddenClass}) {
  return (
    <section className='sidebar'>
                  <CategoryLinks categories = {categories} sidebarhiddenClass={sidebarhiddenClass}/>

    </section>
  )
}

export default Sidebar