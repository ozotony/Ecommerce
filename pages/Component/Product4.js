import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import  { useState, useContext, useRef } from "react";
import { Fieldset } from 'primereact/fieldset';
import {FileInput} from "./FileInput"

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2'





export default function Product4({setapp,selectedFile ,selectedFiles,setSelectedFile ,setSelectedFiles,isFilePicked,setIsFilePicked ,setSelectedFile2 ,setSelectedFiles2  ,isFilePicked2,setIsFilePicked2,selectedFile3 ,selectedFile2 ,selectedFiles2,selectedFiles3,setSelectedFile3 ,setSelectedFiles3,isFilePicked3,setIsFilePicked3,extension1,setextension1,extension2,setextension2,extension3,setextension3,handleSubmission}) {

  const ref = useRef(null);

  const [FieldValue, setFieldValue] = useState()
  const [filesize1, setfilesize1] = useState();
const [filesize2, setfilesize2] = useState();
const [filesize3, setfilesize3] = useState();


function checkexternsion (exention) {

  let kk =exention
 

  if (kk ==="png") {
    return true
  }

  if (kk ==="jpg") {
    return true
  }

  return false

  
 
  
 

}






const changeHandler = (event) => {

  if (event.target.files[0]) {

  let filename =event.target.files[0].name
  let last_dot = filename.lastIndexOf('.')
  let ext = filename.slice(last_dot + 1)

  setextension1(ext)
  setfilesize1(event.target.files[0].size)


  }



 setSelectedFiles(event.target.files[0]);
 event.target.files[0] && setIsFilePicked(true);
// !event.target.files[0] && setIsFilePicked(false);

 //alert(event.target.files[0].type)
 
};

const changeHandler2 = (event) => {

  if (event.target.files[0]) {

    let filename =event.target.files[0].name
    let last_dot = filename.lastIndexOf('.')
    let ext = filename.slice(last_dot + 1)
  
    setextension2(ext)
    setfilesize2(event.target.files[0].size)
  
  
    }

  setSelectedFiles2(event.target.files[0]);
  event.target.files[0] && setIsFilePicked2(true);

  console.log("file")
  console.log(selectedFile2)
 
 
 };

 const changeHandler3 = (event) => {

  if (event.target.files[0]) {

    let filename =event.target.files[0].name
    let last_dot = filename.lastIndexOf('.')
    let ext = filename.slice(last_dot + 1)
  
    setextension3(ext)
    setfilesize3(event.target.files[0].size)
  
  
    }

  setSelectedFiles3(event.target.files[0]);
  event.target.files[0] && setIsFilePicked3(true);
 
 
 };
 

  function HandleChange (event) {

   

    setFieldValue("file", event.currentTarget.files[0]);

  }


  const handleSubmission2 = () => {
    // HANDLING FILE AS SENDING FILE INTO BACKEND

    if (!isFilePicked || !isFilePicked2 || !isFilePicked3) {

      Swal.fire({
        title: 'Error!',
        text: 'All Files Must be Uploaded ',
        icon: 'error',
        confirmButtonText: 'Close'
      })

      return 
    }

    const paths =['png', 'jpg'] 

   // alert(paths.includes( extension1))



   if (!(checkexternsion (extension1) && checkexternsion (extension2)  && checkexternsion (extension3) ) )

   {

    Swal.fire({
      title: 'Error!',
      text: 'Invalid File Extension You can only upload (PNG OR JPG) ',
      icon: 'error',
      confirmButtonText: 'Close'
    })


    return 

   }
  

   // if (!isFilePicked) return;
   alert("inside")
    const formData = new FormData();
    formData.append("File", selectedFile);
     // ALSO ADD RANDOM VALUE IF YOU WANT LIKE STRING , OBJECT OR      ARRAY
    formData.append("carDetail", {
     car: "honda",
     engine: "1498 cc",
     fuel_Type: "Petrol & Diesel",
   });
  // API CALL
   fetch("http://localhost:3000/api/Upload/", {
    method: "POST",
    body: formData,
   })
   .then((response) => response.json())
   .then((result) => {
    console.log("Success:", result);
   })
   .catch((error) => {
     console.error("Error:", error);
    });
   };
 
  





  
    return (
        <>
        
        <Fieldset legend="Upload Image  " >

     
 <form >
 
 
  
  <div className="form-outline mb-4">

  <input type="file"   className="form-control" name="files1" onChange={changeHandler} />
  
  {!selectedFile &&
    <label className="form-label" for="form6Example3" >Upload First Image</label>

  }

<div> {selectedFile &&  <Image src={selectedFile} width={100} height={100} /> } </div>

   
  </div>

  <div className="form-outline mb-4">
  <input type="file"  className="form-control" name="files1" onChange={changeHandler2} />
  {!selectedFile2 &&
    <label className="form-label" for="form6Example3" >Upload Second  Image</label>

  }

   <div> {selectedFile2 &&  <Image src={selectedFile2} width={100} height={100} /> } </div>
  
 
  </div>

  <div className="form-outline mb-4">
  <input type="file"  className="form-control" name="files1" onChange={changeHandler3} />

  {!selectedFile3 &&
    <label className="form-label" for="form6Example3" >Upload Third  Image</label>

  }

<div> {selectedFile3 &&  <Image src={selectedFile3} width={100} height={100} /> } </div>
  
  </div>

  
  
 <div style={{display:'flex',justifyContent:'space-around'}}> 
  <button type="button"  onClick={()=>setapp('prev')} className="btn btn-primary btn-block mb-4">Previous</button>
  <button type="button"  onClick={handleSubmission} className="btn btn-primary btn-block mb-4">Update</button>
  </div>
  </form>



</Fieldset>


        </>

    )


}