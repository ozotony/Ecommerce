import Head from 'next/head'
import Image from 'next/image'
import SideNav from './Component/sidenav2'
import  { useState, useContext, useRef } from "react";
import { NextResponse } from 'next/server'
import Router from 'next/router'
import { useCookies } from "react-cookie"
import {useDispatch, useSelector} from 'react-redux'
import {login, logout} from './store/user'
import { useRouter } from 'next/router'
import { parseCookies } from "./helper/"
import jwt from 'jsonwebtoken';

import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons"; 
import { fafacebook } from "@fortawesome/free-solid-svg-icons"; 




import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { faBluetooth } from '@fortawesome/free-brands-svg-icons';




export default function Login() {
    const ref = useRef(null);
    const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const [cookie, setCookie] = useCookies(["user"])
  const router = useRouter()

  const storeuser = {}


  console.log("store val")

  console.log( user)


    const mystyle = {
        width: "30px",
        marginRight: '40px',
       
        color:'#0D6EFD'
      
      
      };

      const mystyle2 = {
        display:'flex',
        justifyContent:'center'
      
      
      };

      const mystyle3= {
        paddingLeft: '2.5rem',paddingRight: '2.5rem'
      }
  //  Router.push('/')

  const   Login=async()=> {

   // const data2 = "test"

 
  
    
  
         
  
          const body = JSON.stringify({email:ref.current.values.email ,password:ref.current.values.password})
  
          
  
          const res = await fetch('/api/login',{
              method:"POST",
              headers:{
                  'content-Type':'application/json' ,
                  'Accept': 'application/json'
              },
              body:body
          })

          const data = await res.json()

          console.log("token")
          console.log(data.message)

          if (data.message !='Invalid Login Details') {

            setCookie("user",JSON.stringify( data.message), {
              path: "/",
             // maxAge: 3600, // Expires after 1hr
              maxAge: 43200, // Expires after 12hr
              sameSite: true,
            })

            
           const secret = '#ozo333666'

           var decoded =jwt.verify(data.message, secret) ;

           // const data = parseCookies(data) 

            console.log("parse token =")
            console.log(decoded)

            

            storeuser.email=decoded.email;
            storeuser.firstname=decoded.firstname
            storeuser.email=decoded.email
            storeuser.surname=decoded.surname
            storeuser.phone=decoded.phone
           let kk ={'email':decoded.email,'firstname':`${decoded.firstname}`,'surname':`${decoded.surname}`,'phone':`${decoded.phone}`,'userid':`${decoded.userid}`,'usertype':`${decoded.usertype}`}


            //dispatch(login(decoded.email ))

            dispatch(login(kk ))



            console.log("store val2")

            console.log( kk)

            router.push('/')

          }
            //   alert(data.message)
         
        //  console.log('data')
         // console.log(data)

        // Invalid Login Details
         
     
  
  
  }

      const LoginSchema = Yup.object().shape({
        email: Yup.string()
        
          // Format Validation
          .email("Invalid email address format")
        
          // Required Field Validation
          .required("Email is required"),
        password: Yup.string()
        
          //Minimum Character Validation
        
          .required("Password is required") 
     
      });
  return (
    <>

<div className="container">
    <div className="row flex-nowrap">
       
        <Formik initialValues={{name: ""}}
            innerRef={ref}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
               // console.log('ref.current.values')
               // console.log(ref.current.values)
              //  alert(ref.current.values.name2)
              //  console.log(values)
               // alert(ref.current.values.email);
               Login() ;
             //  AddCategoryusers(ref.current.values.name2)
               // loginusers(ref.current.values.email,ref.current.values.password)
                }
            }
            
            >
              {(props) => (
        <div className="container" style={{margin:20}}> 
      <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <Form >
       
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <div  style={mystyle2}> 
   

      <div style={mystyle }>
         <a href="https://www.linkedin.com/in/ravitejakolla">
             <FontAwesomeIcon icon={["fab", "facebook"]} size="1x" />
         </a>
      </div>

      
      <div style={mystyle }>
         <a href="https://www.linkedin.com/in/ravitejakolla">
             <FontAwesomeIcon icon={["fab", "google"]} size="1x" />
         </a>
      </div>

      </div>
           
         

          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

         
          <div className="form-outline mb-4">
          <Field
                        type="email"
                        name="email"
                        placeholder="Enter a valid email address"
                        className="form-control form-control-lg"
                        autoComplete="off"
                      />

            
            <label className="form-label" >Email address</label>

            <ErrorMessage name="email">
                     { msg => <div style={{ color: 'red' }}>{msg}</div> }
                  </ErrorMessage>
          </div>

         
          <div className="form-outline mb-3">

          <Field
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className="form-control form-control-lg"
                        autoComplete="off"
                      />
            
            <label className="form-label" >Password</label>

            <ErrorMessage name="password">
                     { msg => <div style={{ color: 'red' }}>{msg}</div> }
                  </ErrorMessage>
          </div>

          <div className="d-flex justify-content-between align-items-center">
           
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" >
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg"
              style={mystyle3}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
            <Link href="/register">
            <a 
                className="link-danger">Register</a>
        </Link>
            </p>
          </div>

          </Form >
      </div>
    </div>
  </div>
  <div
    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
  
    <div className="text-white mb-3 mb-md-0">
      Copyright © 2022. All rights reserved.
    </div>
   

   
    <div>
      
      
    </div>
   
  </div>
</section>
  </div>
 )}
 </Formik>
    </div>
</div>


    

   
    </>
  )
}
