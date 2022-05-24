import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";

import styles from '../../styles/Mainnav.module.css'

import {useDispatch, useSelector} from 'react-redux'
import {login, logout} from '../store/user'
import React, { useState, useEffect } from 'react';


export default function Mainnav(prop) {
    const router = useRouter();
    const dispatch = useDispatch()
    const {user}= useSelector(state => state.user)

  return (
    <>

   

<nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#e3f2fd;'}} >
  <div className="container-fluid">
   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">

      <span className=" navbar-text me-auto mb-2 mb-lg-0">
      <a className="navbar-brand" href="#">Navbar</a>
      </span>

      <span className="navbar-text">
       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item "  >
        <Link   href="/">
          <a  className={styles.space2} >Home</a>
        </Link>
         
        </li>

        { prop.value &&
        <li className="nav-item space2">
        <Link href="/AddProduct">
          <a className={styles.space2}>Post A product</a>
        </Link>
         
        </li>
}

       

        { prop.value &&
        <li className="nav-item space2">
        <Link href="/AddProduct">
          <a className={styles.space2}>Post A product</a>
        </Link>
         
        </li>
}

{!prop.value &&
        <li className="nav-item space2" >
        <Link href="/Login">
          <a className={styles.space2}>Login</a>
        </Link>
         
        </li>

}


{prop.value &&
        <li className="nav-item" >
        <Link href="/Logout">
          <a className={styles.space2}>Logout</a>
        </Link>
         
        </li>

}
       
      </ul>
      </span>
    </div>
  </div>
</nav>
  
   
    </>
  )
}
