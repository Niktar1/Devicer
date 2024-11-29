import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SignUp extends Component {
  render() {
    return (
      <>
        <div>
            <div className="logpage">
                <div className="container">
                    <Link to={'/'}>
                        <button className='home-btn'>Home</button>
                    </Link>

                    <h1 className='login'>Sign Up</h1>

                    <form action="submit" className='logform'>
                        <input className='log-input' type="text" placeholder='Enter email'/>
                        <input className='log-input' type="text" placeholder='Enter password'/>
                        <button className='btn log-btn'>Sign up</button>
                    </form>
                    <br />
                    <div>or with</div>
                    <p>google</p>
                </div>
            </div>
        </div>
      </>
    )
  }
}
