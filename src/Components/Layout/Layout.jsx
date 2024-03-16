import { Outlet } from 'react-router-dom'
import './Layout.css'
import Navbar from '../Navbar/Navbar'




function Layout() {
 

  return (
    <main >
      <Navbar/>
      <Outlet />
    </main>
  )
}

export default Layout