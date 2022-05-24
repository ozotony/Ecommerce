import Head from 'next/head'
import Image from 'next/image'
import SideNav from './Component/sidenav'



export default function Dashboard() {
  return (
    <>

<div className="container-fluid">
    <div className="row flex-nowrap">
        <SideNav/>
        
        <div className="col py-3">
            Content area...
        </div>
    </div>
</div>


    

   
    </>
  )
}
