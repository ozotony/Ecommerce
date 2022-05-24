import Head from 'next/head'
import Image from 'next/image'
import SideNav from './Component/sidenav2'
import  { useState, useContext, useRef } from "react";
import { NextResponse } from 'next/server'
import Router from 'next/router'
import { useRouter } from 'next/router'


import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';




export default function Register() {
    const ref = useRef(null);
    const router = useRouter()
  //  Router.push('/')

    const   RegisterUser =async()=> {

        const data2 = "test"

     
      
        
      
             
      
              const body = JSON.stringify({firstname:ref.current.values.firstname,
                surname:ref.current.values.surname,email:ref.current.values.email ,phonenumber:ref.current.values.phonenumber
                ,address:ref.current.values.address,password:ref.current.values.password})
      
              
      
              const res = await fetch('/api/addregister',{
                  method:"POST",
                  headers:{
                      'content-Type':'application/json' ,
                      'Accept': 'application/json'
                  },
                  body:body
              })

              const data = await res.json()
              if (data.message =='Not authenticated') {
                //   alert(data.message)
                router.push('/Login')
                return 
               }
            //  console.log('data')
             // console.log(data)
             alert("Record added successfully")
         
      
      
      }

      const LoginSchema = Yup.object().shape({
        email: Yup.string()
        
          // Format Validation
          .email("Invalid email address format")
        
          // Required Field Validation
          .required("Email is required"),
        password: Yup.string()
        
          //Minimum Character Validation
          .min(3, "Password must be 3 characters at minimum")
          .required("Password is required") ,
        passwordConfirmation: Yup.string()
        .required("Password Confirmation is required")
     .oneOf([Yup.ref('password'), null], 'Passwords must match') ,
     firstname: Yup.string() 
     .required("Firstname  is required") ,
     surname: Yup.string() 
     .required("Surname  is required") ,
     phonenumber: Yup.string() 
     .required("PhoneNumber  is required") ,

     address: Yup.string() 
     .required("Address   is required") ,

     terms: Yup.bool() 
     .required("Term and Condition   is required") ,
      });
  return (
    <>

<div className="container-fluid" >
    <div  style={{display:'flex',width:'100%'}}>
        <SideNav/>
      
        <div style={{margin:3 ,width:'700px',flexGrow:'2'}}> 
        <section className="vh-100" style={{backgroundColor:'#eee'}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: '25px'}}>
          <div className="card-body p-md-5">
            <div   style={{display:'flex',width:'800px'}}>
              <div className="col-md-10 "  style={{flexGrow:'2',width:'400px'}}>

                <p className="text-center h1 fw-bold ">Sign up</p>

                <Formik initialValues={{ email: "", password: "",passwordConfirmation: "", firstname: "", surname: "" , phonenumber: "" , address: ""}}
            innerRef={ref}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
             // alert("submitting")
               // console.log('ref.current.values')
               // console.log(ref.current.values)
                RegisterUser() 
              
                }
            }
            
            >
              {(props) => (

                <Form >

                  <div className="d-flex flex-row align-items-center mb-4">
                   
                    <div className="form-outline flex-fill mb-0">
                    <Field
                        type="text"
                        name="firstname"
                        placeholder="Enter First Name"
                        className="form-control"
                        autoComplete="off"
                      />

                    
                      <label className="form-label" >First Name</label>
                    
                      <ErrorMessage name="firstname">
                     { msg => <div style={{ color: 'red' }}>{msg}</div> }
                  </ErrorMessage>
                        
                      
                     
                    </div>
                  </div>


                  <div className="d-flex flex-row align-items-center mb-4">
                   
                    <div className="form-outline flex-fill mb-0">

                    <Field
                        type="text"
                        name="surname"
                        placeholder="Enter SurName"
                        className="form-control"
                        autoComplete="off"
                      />
                     
                      <label className="form-label" >Surname</label>

                      <ErrorMessage name="surname">
                     { msg => <div style={{ color: 'red' }}>{msg}</div> }
                  </ErrorMessage>
                    </div>
                  </div>



                  <div className="d-flex flex-row align-items-center mb-4">
                  
                    <div className="form-outline flex-fill mb-0">

                    <Field
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        className="form-control"
                        autoComplete="off"
                      />
                     
                      <label className="form-label" >Your Email</label>

                      <ErrorMessage name="email">
                     { msg => <div style={{ color: 'red' }}>{msg}</div> }
                  </ErrorMessage>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                   
                    <div className="form-outline flex-fill mb-0">
                    <Field
                        type="text"
                        name="phonenumber"
                        placeholder="Enter PhoneNumber"
                        className="form-control"
                        autoComplete="off"
                      />
                     
                      <label className="form-label" >Phone Number </label>

                      <ErrorMessage name="phonenumber">
                     { msg => <div style={{ color: 'red' }}>{msg}</div> }
                  </ErrorMessage>
                    </div>
                  </div>



                  <div className="d-flex flex-row align-items-center mb-4">
                 
                    <div className="form-outline flex-fill mb-0">
                    <Field  name="address"  className="form-control" component="textarea" rows="4" ></Field>
                     
                      <label className="form-label" >Address</label>

                      <ErrorMessage name="address">
                     { msg => <div style={{ color: 'red' }}>{msg}</div> }
                  </ErrorMessage>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                  
                    <div className="form-outline flex-fill mb-0">
                    <Field
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        className="form-control"
                        autoComplete="off"
                      />
                     
                      <label className="form-label" >Password</label>

                      <ErrorMessage name="password">
                     { msg => <div style={{ color: 'red' }}>{msg}</div> }
                  </ErrorMessage>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                   
                    <div className="form-outline flex-fill mb-0">
                    <Field
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Confirm Password"
                        className="form-control"
                        autoComplete="off"
                      />
                     
                      <label className="form-label" >Repeat your password</label>

                      <ErrorMessage name="passwordConfirmation">
                     { msg => <div style={{ color: 'red' }}>{msg}</div> }
                  </ErrorMessage>
                    </div>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                  <Field
                        type="checkbox"
                        name="terms"
                        
                        className="form-check-input me-2"
                        autoComplete="off"
                      />
                 
                   
                    <label className="form-check-label" >
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>

                    
                  </div>

                  <ErrorMessage name="terms">
                     { msg => <div style={{ color: 'red' }}>{msg}</div> }
                  </ErrorMessage>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                  </div>
                 

                  </Form>

)}
</Formik>

              </div>
              <div style={{alignSelf:"center",marginLeft:'30px' ,flexGrow:'1',width:'300px',position:'relative',top:'-200px'}} >

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </div>
 
    </div>
</div>


    

   
    </>
  )
}
