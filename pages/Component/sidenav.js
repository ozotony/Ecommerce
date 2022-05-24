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
                    <span className="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className={router.pathname == "/" ? `${styles.active}  w-100` : `${styles.inactive}  w-100`}>
                    <Link  className="fs-4 bi-house" href="/">home</Link>
                       
                    </li>
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            
                            <i className="fs-4 bi-speedometer2"></i> <span className="">Settings</span> </a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">

                       

                         <li  className={router.pathname == "/category" ? `${styles.active}  w-100` : `${styles.inactive}  w-100`}>
                         <Link href="/category">Add Category</Link>
                         </li>

                         <li  className={router.pathname == "/subcategory" ? `${styles.active}  w-100` : `${styles.inactive}  w-100`}>
                         <Link href="/subcategory">Add SubCategory</Link>
                         </li>

                         
                         <li  className={router.pathname == "/AddProduct" ? `${styles.active}  w-100` : `${styles.inactive}  w-100`}>
                         <Link href="/AddProduct">Add Item</Link>
                         </li>

                                  
                         <li  className={router.pathname == "/GetProduct" ? `${styles.active}  w-100` : `${styles.inactive}  w-100`}>
                         <Link href="/GetProduct">Display Product</Link>
                         </li>
                           
                        </ul>
                    </li>
                    
                    
                    
                </ul>
                <hr/>
                <div className="dropdown pb-4">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                        <span className="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>


    

   
    </>
  )
}
