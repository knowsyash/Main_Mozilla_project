import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {auth,provider} from "../config/firebaseconfig"
import {signInWithPopup, signOut} from 'firebase/auth';
import{authContext} from '../App'


export default function Navbar(props) {

  const Auth= useContext(authContext);


  

  const signInWithGoogle=(e)=>{
    e.preventDefault();
    signInWithPopup(auth,provider).then(async(result)=>{
      if(result)
        {
            console.log("User has signed in",result.user);
            alert(`welcome ${result.user.displayName}`);
            Auth.setValue(true)
            Auth.setToken(result.user.accessToken);
            Auth.setUser(result.user.email);
            
        }


        const userdata={  
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL
      }


      try
      {
        const response =await fetch('http://localhost:5000/api/auth',{

          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },

          body: JSON.stringify(userdata)
        })



        if(response)
          {
              console.log("USER DATA SENT TO BACKEND")
              console.log(response)
          }
      }catch(e)
      {
        console.error("Error sending user data to backend",e)
      }

     

    })
  }



  const handlelogout=(e)=>{
    e.preventDefault();

    signOut(auth).then(()=>{
      console.log("User has signed out");
      Auth.setValue(false);
      Auth.setToken(null);
      Auth.setUser(null);
  })

  }



  return (
    <>
      <div>
        <nav className={`navbar navbar-expand-lg bg-${props.mode} navbar-${props.mode}`}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">greBlogger</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/feed">Feed</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    id="navbarDropdown"
                  >
                    Dropdown
                  </Link>
                  <ul className={`dropdown-menu bg-${props.mode}`} aria-labelledby="navbarDropdown">
                    <li>
                      <Link className={`dropdown-item ${props.mode === 'dark' ? 'text-light' : 'text-dark'}`} to="#">
                        Apply for a Job
                      </Link>
                    </li>
                    <li>
                      <Link className={`dropdown-item ${props.mode === 'dark' ? 'text-light' : 'text-dark'}`} to="#">
                        Create Blogs
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className={`dropdown-item ${props.mode === 'dark' ? 'text-light' : 'text-dark'}`} to="#">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Find Your Interest"
                  aria-label="Search"
                  
                />

               { 
                  Auth.value?(<button className="btn btn-outline-success" onClick={handlelogout}  style={{ minWidth: "120px", minHeight: "40px" }}>
                  Log out</button>):(<button className="btn btn-outline-success" onClick={signInWithGoogle}  style={{ minWidth: "120px", minHeight: "40px" }}>login</button>)
               }
                
               
              </form>
            </div>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              onClick={props.toggleMode}
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              {props.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </label>
          </div>
        </nav>
      </div>
    </>
  );
}