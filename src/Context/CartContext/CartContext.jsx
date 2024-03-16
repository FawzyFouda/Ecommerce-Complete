import { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext/UserContext"
import axios from "axios"
import { toast } from 'react-toastify';


export let CartContext= createContext()
export default function CartContextProvider(props) {
    let headers = {token: localStorage.getItem('userToken')}
    let [numOfCartItems, setNumOfCartItems] = useState(null)
    let [cartAllProducts, setCartAllProducts]= useState(null)
    let [cartTotalCartPrice, setTotalCartPrice]= useState(null)
    let [cartId, setCartId]= useState(null)
    let [isLoading ,setIsLoading] = useState(true)
    let {userToken} = useContext(UserContext)
// ---------------------------------------------
    async function getLogedCartApi(){    //to get cart details when start app
        setIsLoading(true)
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            {headers:{
                token:localStorage.getItem('userToken')
            }})
            .then((res) =>{
                if(res.data){
                    setIsLoading(false)
                }
            setCartAllProducts(res.data.data.products)
            setNumOfCartItems(res.data.numOfCartItems)
            setTotalCartPrice(res.data.data.totalCartPrice)
            setCartId(res.data.data._id)
            }
            )
            .catch((error) => error)
    }
// ---------------------------------------------
    async function addProductCartApi(productId){ //to add products to cart 
            const boleanFlag = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {productId},{headers})
        .then((res) => {
            if(res.data.status == 'success'){
                setIsLoading(false)
                toast.success('Product Added Sucessfully',{
                    position: "top-center"
                  })
            }
            getLogedCartApi()
            return true
        }
        )
        .catch((error) =>{
        if(error){
            toast.error('Please Login First To Add Product',{
                position: "top-center"
              })
        }
        return false
    }
        )
        return boleanFlag
    }
// ---------------------------------------------
async function UpdateCartItemApi(productId,count){
    const booleanFlag =  await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {count}
    ,
    {headers}
    ).then((res) => {
        setCartAllProducts(res.data.data.products)
        setNumOfCartItems(res.data.numOfCartItems)
        setTotalCartPrice(res.data.data.totalCartPrice)
        return true
    })
    .catch((err) =>{
        return false
    })
    return booleanFlag;
}
// ---------------------------------------------

    async function removeCartItemApi(productId){ //to remove products from cart 
        const booleanFlag = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {headers})
        .then((res) => {
            setCartAllProducts(res.data.data.products)
            setNumOfCartItems(res.data.numOfCartItems)
            setTotalCartPrice(res.data.data.totalCartPrice)
        return true
        })
        .catch((error) => {
        return false
    })
    return booleanFlag
    }
// ---------------------------------------------
    async function clearCartApi(){ //to remove products from cart 
        const booleanFlag = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {headers})
        .then((res) => {
            setCartAllProducts(null)
            setNumOfCartItems(0)
            setTotalCartPrice(0)
        return true
        })
        .catch((error) => {
        return false
    })
    return booleanFlag
    }
// ---------------------------------------------

// ---------------------------------------------
useEffect(() => {
    if(!userToken){
        setNumOfCartItems(0)
    }
    getLogedCartApi()
},[userToken])
return (
    <CartContext.Provider value={{addProductCartApi,getLogedCartApi,UpdateCartItemApi,removeCartItemApi,clearCartApi,setCartAllProducts,setNumOfCartItems,numOfCartItems,cartAllProducts,cartTotalCartPrice,isLoading,cartId,setIsLoading}}>
        {props.children}
    </CartContext.Provider>
)
}

