import { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext/UserContext"
import axios from "axios"

export let WishlistContext= createContext()
export default function WishlistContextProvider(props) {
    let headers = {token: localStorage.getItem('userToken')}
    let [numOfWishlistItems, setNumOfWishlistItems] = useState(null)
    let [wishlistAllProducts, setWishlistAllProducts]= useState(null)
    let [isLoading ,setIsLoading] = useState(true)
    let {userToken} = useContext(UserContext)
// ---------------------------------------------
    async function getLogedWishlistApi(){    //to get cart details when start app
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {headers})
            .then((res) =>{
                setWishlistAllProducts(res?.data.data)
                setNumOfWishlistItems(res?.data?.count)
            }
            )
            .catch((error) => console.log('err' + error))
    }
// ---------------------------------------------
    async function addProductWishlistApi(productId){ //to add products to cart 
            const boleanFlag = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {productId},{headers})
        .then((res) => {
            // console.log(res)
            // if(res.data.status == 'success'){
            //     setIsLoading(false)
            // }
            getLogedWishlistApi()
            return true
        }
        )
        .catch((error) =>{
        console.log('err' + error)
        return false
    }
        )
        return boleanFlag
    }
// ---------------------------------------------
    async function removeWishlistItemApi(productId){ //to remove products from cart 
        const booleanFlag = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {headers})
        .then((res) => {
            // setWishlistAllProducts(res?.data.data)
            // setNumOfWishlistItems(res?.data?.count)
            getLogedWishlistApi()
        return true
        })
        .catch((error) => {
        console.log(error)
        return false
    })
    return booleanFlag
    }
// ---------------------------------------------
useEffect(() => {
    if(!userToken){
        setNumOfWishlistItems(0)
    }
    getLogedWishlistApi()
},[userToken])
return (
    <WishlistContext.Provider value={{addProductWishlistApi,getLogedWishlistApi,removeWishlistItemApi,numOfWishlistItems,wishlistAllProducts,setWishlistAllProducts,setNumOfWishlistItems,isLoading,setIsLoading}}>
        {props.children}
    </WishlistContext.Provider>
)
}

