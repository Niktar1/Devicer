import { Link } from "react-router-dom";
import { Products } from "./Products";
import Basket from "./Basket";

export default function Home() {
    return (
        <>
            <div className='container'>
                <h1 className='home'>Home</h1>
                <div className="devider">
                    <Basket />
                    <Products />
                </div>


                {/* <Link to={'/login'}>
                    <button className='btn login-btn'>login</button>
                </Link>
                <Link to={'/signup'}>
                    <button className='btn login-btn'>sign up</button>
                </Link> */}
            </div>
        </>
    )
}