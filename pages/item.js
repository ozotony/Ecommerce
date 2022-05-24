import Head from 'next/head'
import Image from 'next/image'
import SideNav from './Component/sidenav'



export default function Item() {
  return (
    <>

<div className="container-fluid">
    <div className="row flex-nowrap">
        <SideNav/>
        
        <div className="col py-3">
           Item  Content area...
        </div>
    </div>
</div>


    

   
    </>
  )
}
