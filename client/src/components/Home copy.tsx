import { Link } from "react-router-dom";
// import axios from 'axios';
import { useDispatch } from 'react-redux';
// import { 
//     decrement, 
//     decrementByAmount, 
//     increment, 
//     incrementByAmount,
//     incrementAsync 
// } from "../state/auth/authSlice";

// import { addToBaskettAsync } from "../state/requests/addProductSlice"


export default function Home() {

    // const handleGoogleLogin = () => {
    //     window.location.href = "http://localhost:3000/auth/google/login";
    // };

    // const postAxios = async () => {
    //     const url = 'http://localhost:3000/baskets';

    //     const response = await axios.post(url, { userId: 1 }).then(function (response) {
    //         console.log('Response:', response.data);
    //     })
    //     console.log(response)
    // }


    // const auth = useSelector((state: RootState) => state.auth.anonymousId);
    // const dispatch = useDispatch<AppDispath>();

    // fetch from @Get() on 'products'
    //logic to async function to fetch all products return Product[]
    // const products[]:addType = AsyncLoadProducts()

    return (
        <>

            {/* <div className="product-card">
                {products.map((product) => {
                    return <li key={product.id}>{product.name}</li>
                })}
                
                <div className="product_img"><img src="" alt="productImage" /></div>
                <div className="productName"></div>
            </div> */}

            <div className="addProduct">
                {/* <button className="btn" onClick={() => dispatch(addToBaskettAsync(1))}>Add to cart</button> */}
            </div>


            <br /><br />
            <div className='container'>
                <h1 className='home'>Home</h1>
                <Link to={'/login'}>
                    <button className='btn login-btn'>login</button>
                </Link>
                <Link to={'/signup'}>
                    <button className='btn login-btn'>sign up</button>
                </Link>
                {/* <div onClick={handleGoogleLogin}>
                    <button className='btn login-btn'>Google+</button>
                </div> */}
            </div>
            {/* <div className="add-product">
                <button onClick={postAxios} className='btn'>Add to Cart</button>
            </div> */}


            {/* <h2>{auth}</h2>
            <div>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <br />
                <button onClick={() => dispatch(decrement())}>Decrement</button>
                <br />
                <button onClick={() => dispatch(incrementByAmount(5))}>IncrementByAmount</button>
                <br />
                object as param example
                <button onClick={() => dispatch(decrementByAmount({ value: 2 }))}>DecrementByAmount</button>
                <hr />
                <button onClick={() => dispatch(incrementAsync(100))}>IncrementAsync</button>
            </div> */}
        </>
    )
}