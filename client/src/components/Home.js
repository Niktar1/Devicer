import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <>
                <div className='container'>
                    <h1 className='home'>Home</h1>
                    <Link to={'/login'}>
                        <button className='btn login-btn'>login</button>
                    </Link>
                    <Link to={'/signup'}>
                        <button className='btn login-btn'>sign up</button>
                    </Link>
                </div> 
            </>
        )
    }
}
