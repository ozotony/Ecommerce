import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";

import styles from '../../styles/SideNav.module.css'


export default function SideNav() {
    const router = useRouter();
  return (
    <>

<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline"></span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        
                    </li>
     
                </ul>
                <hr/>
                <div className="dropdown pb-4">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                        <span className="d-none d-sm-inline mx-1">Sign In</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">

                    <Link href="/Login">
                      <a className="dropdown-item">Sign In</a>
                      </Link>
                        
                     
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>

                        <Link href="/Login">
                      <a className="dropdown-item">Sign In</a>
                      </Link>
                      
                    </ul>
                </div>
            </div>
        </div>


    

   
    </>
  )
}
