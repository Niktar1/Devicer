import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Login extends Component {
  render() {
    return (
      <>
        <div>
            <div className="logpage">
                <div className="container">
                    <Link to={'/'}>
                        <button className='home-btn'>Home</button>
                    </Link>

                    <h1 className='login'>Login Page</h1>
                    <hr />
                    <form action="submit" className='logform'>
                        <input className='log-input' type="text" placeholder='Enter email'/>
                        <input className='log-input' type="text" placeholder='Enter password'/>
                        <button className='btn log-btn' type='submit'>login</button>
                    </form>
                </div>
            </div>
        </div>
      </>
    )
  }
}
