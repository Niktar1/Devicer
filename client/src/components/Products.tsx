import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, Product } from '../state/requests/productSlice'
import { AppDispatch, RootState } from '../state/store'
import { addToBasketAsync } from '../state/requests/BasketProductSlice'
import { fetchBasket } from '../state/auth/authSlice'

export const Products = () => {
    const product = useSelector((state: RootState) => state.product)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchBasket())
    }, [dispatch])



    return (
        <div>
            <h2 className='home'>All Products:</h2>
            {product.loading && <div>()...</div>}
            {!product.loading && product.error ? <div>Error: {product.error} </div> : null}

            {!product.loading && product.products.length ? (
                <ul className='cards_list'>
                    {
                        product.products.map((product: Product) => (
                            <li key={product.id}>
                                <div className='card'>
                                    <div className="product-card">
                                        <div className="product_image">
                                            <img src="https://placehold.co/259" alt=""/>
                                        </div>
                                        <div className='card__inner'>
                                            <h3 className='product-name'>{product.name}</h3>
                                            <p className='product-price'>${product.price}.00</p>
                                            <p className='product-rating'>★★★★★</p>
                                            <button className="btn-products" onClick={() => dispatch(addToBasketAsync(product.id))}>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            ) : null}

        </div>
    )
}
