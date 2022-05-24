import Head from 'next/head'
import Image from 'next/image'
import SideNav from './Component/sidenav'
import Dialog2 from './Component/Dialog2'
import { parseCookies } from "./Helper/"
import  { useState, useContext, useRef } from "react";
import { useEffect } from 'react';
import { NextResponse } from 'next/server'
import Router from 'next/router'
import { useRouter } from 'next/router'
import cookie from "cookie"


import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}


export default function Category({ data }) {
    const ref = useRef(null);
    const router = useRouter()
    const [Message, setMessage] = useState('')
    const [ShowDialog, setDialog] = useState(false)
  //  Router.push('/')

  console.log('data')
  console.log(data)

  function isEmpty(obj) { 
    for (var x in obj) { return false; }
    return true;
  }
  

  useEffect(() => {

   

    
    if (isEmpty(data)) {
      router.push('/Logout')
      return 
    }
 // }
}, [])


  const hidedialog=()=> setDialog(false);

    const   AddCategoryusers =async(name2)=> {

        const data2 = "test"

     
      
        
        const newdata = {name2:name2}
       // alert(username)
      
             
      
              const body = JSON.stringify({name2:name2})
      
              
      
              const res = await fetch('/api/category/addcategory',{
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
               router.push('/Logout')
               return 
              }
           //  console.log('data')
            // console.log(data)

            setMessage("Record added successfully")
            setDialog(true);
           // alert("Record added successfully")
         
      
      
      }

    const LoginSchema = Yup.object().shape({
        name2: Yup.string()
        
          // Format Validation
                
          // Required Field Validation
          .required("Name is required"),
        
      });
  return (
    <>

<div className="container-fluid">
    <div className="row flex-nowrap">
        <SideNav/>
        <Formik initialValues={{name: ""}}
            innerRef={ref}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
                console.log('ref.current.values')
                console.log(ref.current.values)
              //  alert(ref.current.values.name2)
              //  console.log(values)
               // alert(ref.current.values.email);
               AddCategoryusers(ref.current.values.name2)
               // loginusers(ref.current.values.email,ref.current.values.password)
                }
            }
            
            >
              {(props) => (
        <div className="container " style={{margin:30,width:'50%'}}> 
        <Form>
      
          <Dialog2 showDialog={ShowDialog}  Message={Message}  hidedialog={hidedialog} />
  <div className="form-group form-outline ">
                      <label htmlFor="namel">Category Name</label>
                      <Field
                        type="text"
                        name="name2"
                        className="form-control"
                        placeholder="Enter category name"
                        autoComplete="off"
                      />


<ErrorMessage name="name2">
    { msg => <div style={{ color: 'red' }}>{msg}</div> }
</ErrorMessage>

  


                    </div>


  <button type="submit" className="btn btn-primary">Submit</button>
  </Form>
  </div>
 )}
 </Formik>
    </div>
</div>


    

   
    </>
  )
}


Category.getInitialProps = async ({ req,res }) => {
  //const data = parseCookies(req)

 // const cookies2 = new cookie(req, res)
//console.log(getCookie('user'))


 // console.log(req.headers.cookie)

  return {
    data:  cookie.parse(req ? req.headers.cookie || "" : document.cookie),
  }
}
