import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import { fetchBasket } from '../state/auth/authSlice'
import { basketProductsAsync, fetchBasketProduct } from '../state/requests/BasketProductSlice'



export default function Basket() {

    const dispatch = useDispatch<AppDispatch>()
    const basket = useSelector((state: RootState) => state.auth)
    const productState = useSelector((state: RootState) => state.BasketProduct)

    useEffect(() => {
        dispatch(fetchBasket())
    }, [dispatch])

    useEffect(() => {
        if (basket) {
            dispatch(basketProductsAsync())
        }
    }, [dispatch, basket])

    useEffect(() => {
        // When the basket products are fetched, dispatch fetchBasketProduct for each product
        if (productState.products.length > 0) {
            productState.products.forEach((product) => {
                dispatch(fetchBasketProduct(product.id))
            })
        }
    }, [dispatch, productState.products]) // Re-run when productState.products changes
    useEffect(() => {
        console.log(productState.products);  // Log products to check their structure
    }, [productState.products]);

    return (
        <div>
            <h1>Your Basket</h1>
            {/* Ensure products is an array before attempting to map */}
            {Array.isArray(productState.products) && productState.products.length > 0 ? (
                <ul>
                    {productState.products.map((product) => (
                        <li key={product.id}>
                            <div>{product.name || 'Product Name Unavailable'}</div>
                            <div>{product.price ? `$${product.price}` : 'Price Unavailable'}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No products in the basket</div>
            )}
        </div>
    );
}
