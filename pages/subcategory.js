import Head from 'next/head'
import Image from 'next/image'
import SideNav from './Component/sidenav'
import {SelectField} from './Component/SelectField'
import  { useState, useContext, useRef } from "react";
import { NextResponse } from 'next/server'
import Router from 'next/router'
import { useRouter } from 'next/router'
import React, {  useEffect } from 'react';
import Select from 'react-select'
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import Dialog2 from './Component/Dialog2'
 


import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';




export default function SubCategory({ data }) {
    const ref = useRef(null);
    const router = useRouter()
    const [options, setValue] = useState([])
    const [Message, setMessage] = useState('')
    const [ShowDialog, setDialog] = useState(false)
  //  Router.push('/')

  const hidedialog=()=> setDialog(false);

    const options2 = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
    
  //  Router.push('/')

  const handleChange = (selectedOption) => {
   // this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

   useEffect(() => {


    const fetchData = async () => {
      try {
      const res = await fetch('/api/category/getcategory',{
        method:"GET",
        headers:{
            'content-Type':'application/json' ,
            'Accept': 'application/json'
        }
    })

    const data = await res.json()

    if (data.message =='Not authenticated') {
      //   alert(data.message)
      router.push('/Logout')
      return 
     }
    let arraydata=[]
    let arraydata2={}
  
   console.log("server data")
  
   console.log(data)
   //arraydata.push({ value: '', label: 'Chocolate'})
   const obj2 = { value: '', label: 'Select Subcategory'};
   arraydata.push(obj2)
   data.map(function(item, i){
    const obj = { value: item.id, label: item.Name};
   // arraydata2.value=item.id;
   // arraydata2.label=item.Name;

    arraydata.push(obj)
  })

  console.log('arraydata')

  console.log(arraydata)


   setValue(arraydata)
}

catch( e) {

}

    }
  
    fetchData()
  },[])
  
  



    const   AddCategoryusers =async()=> {

        const data2 = "test"

     
      
        
      //  const newdata = {name2:name2}
       // alert(username)
      
             
      
              const body = JSON.stringify({name2:ref.current.values.name2,category:ref.current.values.category})
      
              
      
              const res = await fetch('/api/category/addsubcategory',{
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
            
           
         //   alert("Record added successfully")
         
      
      
      }

    const LoginSchema = Yup.object().shape({
        name2: Yup.string()
        
          // Format Validation
                
          // Required Field Validation
          .required("Name is required"),

          category: Yup.string()
        
          // Format Validation
                
          // Required Field Validation
          .required("Category  is required"),
        
      });
  return (
    <>

<div className="container-fluid"   >
    <div className="row flex-nowrap">
        <SideNav/>
        <Formik initialValues={{name: ""}}
            innerRef={ref}
            validationSchema={LoginSchema}
            onSubmit={(values, { resetForm }) => {
                console.log('ref.current.values')
              //  console.log(ref.current.values)
              //  alert(ref.current.values.name2)
              //  console.log(values)
               // alert(ref.current.values.email);
             //  alert(ref.current.values.category)
               AddCategoryusers();
             //  resetForm();
             //  AddCategoryusers(ref.current.values.name2)
               // loginusers(ref.current.values.email,ref.current.values.password)
                }
            }

  
            
            >
              {(props) => (


        <div className="container" style={{margin:30,width:'50%'}}> 

        <Form>

        <Dialog2 showDialog={ShowDialog}  Message={Message}  hidedialog={hidedialog} />
                 
                 
                    <div className="form-group">
                      <label htmlFor="namel">Category</label>

                      <Field name={'category'} component={SelectField} options={options} />

                     
                     

             
<ErrorMessage name="category">
    { msg => <div style={{ color: 'red' }}>{msg}</div> }
</ErrorMessage>


                    </div>


                    <div className="form-group">
                      <label htmlFor="namel">Sub Category Name</label>
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


