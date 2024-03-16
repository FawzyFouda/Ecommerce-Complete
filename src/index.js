import React from 'react';
import './index.css'
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from './Context/UserContext/UserContext';
import CartContextProvider from './Context/CartContext/CartContext';
import WishlistContextProvider from './Context/WishlistContext/WishlistContext';
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
    <UserContextProvider>
    <WishlistContextProvider>
        <CartContextProvider>
            <App />
        </CartContextProvider>
    </WishlistContextProvider>
    </UserContextProvider>
    </QueryClientProvider>  
);