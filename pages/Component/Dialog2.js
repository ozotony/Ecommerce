import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import  { useState, useContext, useRef } from "react";


export default function Dialog2(props) {
    const [ShowMessage, setShowMessage] = useState(true)
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={props.hidedialog} /></div>;
  
    return (
        <>
<Dialog visible={props.showDialog} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>{props.Message}!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>tony </b> ; it'll be valid next 30 days without activation. Please check <b>ozotony@yahoo.com</b> for activation instructions.
                    </p>
                </div>
            </Dialog>


        </>

    )


}