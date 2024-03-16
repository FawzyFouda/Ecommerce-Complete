import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import Home from "./Components/Home/Home.jsx";
import Cart from './Components/Cart/Cart.jsx'
import WishList from './Components/WishList/WishList.jsx'
import Checkout from './Components/Checkout/Checkout.jsx'
import Products from './Components/Products/Products.jsx'
import Notfound from './Components/Notfound/Notfound.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Protected from './SubComponents/Protected/Protected.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import Signup from './Components/Authentication/Signup/Signup.jsx';
import Signin from './Components/Authentication/Signin/Signin.jsx';
import BrandDetails from './Components/BrandDetails/BrandDetails.jsx';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails.jsx';



let router = createBrowserRouter([
  {path:'/',element:<Layout />, children:[
    {index:true,element:<Home />},
    {path:'brands',element:<Brands/>},
    {path:'brandDetails/:id',element:<BrandDetails/>},
    {path:'productdetails/:id',element:<ProductDetails/>},
    {path:'categoryDetails/:id',element:<CategoryDetails/>},
    {path:'cart',element:<Protected TargetName='Cart'><Cart/></Protected>},
    {path:'wishlist', element:<Protected TargetName='WishList'><WishList/></Protected>},
    {path:'checkout', element:<Protected TargetName='Checkout'><Checkout/></Protected>},
    {path:'products', element:<Products/>},
    {path:'allorders', element:<Products/>},
    {path:'*', element:<Notfound/>},

  ]},
    {path:'signin',element:<Signin/>},
    {path:'signup',element:<Signup/>}
])


function App() {

  return (
    <>
<RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;









  
// const [selectedCategory,setSelectedCategory] = useState(null)
// const [query,setQuery] = useState('')

// const handleInputChange = e => {
//   setQuery(e.target.value)

// }

// const filteredItems = Data.filter((product) => 
//   product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1
// )
// // ----RadioFilter----
// const handleChange = e => {
// setSelectedCategory(e.target.value)
// console.log('selectedCategory Radio  ' + selectedCategory)
// }
// // ----ButtonsFilter----
// const handleClick = e => {
//   setSelectedCategory(e.target.value)
//   Array.from(document.querySelectorAll('.rec-buttons button')).filter((btn) =>btn !== e.target).map(btn => btn.classList.remove('active','bg-primary','text-light'))
//   e.target.classList.add('active','bg-primary','text-light')
//   console.log('selectedCategory Buttons  ' + selectedCategory)
// }
// function filteredData(Data,selected,query){
// let filteredProducts = Data
// // filtering search Items
// if(query){
//   filteredProducts = filteredItems
//   console.log('filteredProducts when serch ' + filteredProducts)
// } 
// // filtering radio Items
// if(selected){
//   filteredProducts = filteredProducts.filter(
//     ({category,color,company,newPrice,title}) => 
//     category === selected || 
//     color === selected || 
//     company ===selected || 
//     newPrice === selected || 
//     title === selected
//     )
//   console.log('filteredProducts when radio ' + filteredProducts)
// } 
// return filteredProducts.map(
//   ({img,title,star,reviews,newPrice,prevPrice}) =>
  
//   <Card 
//     key={Math.random()}
//     img={img}
//     title={title}
//     star={star}
//     reviews={reviews}
//     newPrice={newPrice}
//     prevPrice={prevPrice}
//   />
  
// )
// }
// const result = filteredData(Data,selectedCategory,query)