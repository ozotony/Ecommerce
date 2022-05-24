import { useCookies } from "react-cookie";
import { serialize } from "react-cookie";
import Product1 from "./Component/Product1";
import Product2 from "./Component/Product2";

import SideNav from "./Component/sidenav";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Steps } from "primereact/steps";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/user";
import Swal from "sweetalert2";

export default function AddProduct() {
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userid, setuserid] = useState();

  // let userid=''

  //alert(userid)

  const router = useRouter();
  const [step, setStep] = useState(0);
  const [activeIndex, setactiveIndex] = useState(0);

  const [productname, setproductname] = useState();
  const [productdescription, setproductdescription] = useState();
  const [productstatus, setproductstatus] = useState();
  const [price, setprice] = useState();
  const [prodstate, setprodstate] = useState([]);
  const [prodstate2, setprodstate2] = useState();
  const [city, setcity] = useState([]);
  const [city2, setcity2] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [selectedFile2, setSelectedFile2] = useState();
  const [isFilePicked2, setIsFilePicked2] = useState(false);

  const [selectedFile3, setSelectedFile3] = useState();
  const [isFilePicked3, setIsFilePicked3] = useState(false);

  const [groupcategory, setGroupcategory] = useState();

  const [extension1, setextension1] = useState();
  const [extension2, setextension2] = useState();
  const [extension3, setextension3] = useState();

  useEffect(() => {
    console.log("user");
    let k2 = typeof window !== "undefined" ? localStorage.getItem("user") : "";
    if (k2) {
      const obj = JSON.parse(k2);
      console.log(obj.user.userid);
      setuserid(obj.user.userid);

      //userid =obj.user.userid
    }

    // }
  }, []);

  const items = [{ label: "Step 1" }, { label: "Step 2" }];

  const handleSubmission = () => {
    // HANDLING FILE AS SENDING FILE INTO BACKEND

    alert("about to call api 1");
    if (!isFilePicked) return;
    const formData = new FormData();
    formData.append("File", selectedFile);
    formData.append("File2", selectedFile2);
    formData.append("File3", selectedFile3);
    // ALSO ADD RANDOM VALUE IF YOU WANT LIKE STRING , OBJECT OR      ARRAY
    formData.append(
      "ProdDetail",
      JSON.stringify({
        productname,
        productdescription,
        productstatus,
        price,
        userid,

        prodstate2,

        city2,
        groupcategory,
      })
    );
    // API CALL

    fetch("http://localhost:3000/api/Upload2/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        Swal.fire("Record saved succesfully");
        router.push("/GetProduct");
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error Occured ",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const prodstatechange = async (ee) => {
    const body = JSON.stringify({ Id: ee });

    const res2 = await fetch("/api/category/getarea", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Accept: "application/json",
      },
      body: body,
    });

    const data2 = await res2.json();

    console.log("data2");
    console.log(data2);

    setcity(data2);

    setprodstate2(ee);

    //  alert(ee)
  };
  const setapp = async (status) => {
    if (status == "next") {
      setStep(1);
      setactiveIndex(1);
    } else {
      setStep(0);
      setactiveIndex(0);
    }
  };

  return (
    <>
      <div className="container  row flex-nowrap ">
        <SideNav />
        <div>
          <Steps model={items} activeIndex={activeIndex} readOnly={false} />
          <div
            style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
          >
            {step == 0 && (
              <Product1
                setapp={setapp}
                setproductname={setproductname}
                productname={productname}
                setproductstatus={setproductstatus}
                productstatus={productstatus}
                setprice={setprice}
                price={price}
                setGroupcategory={setGroupcategory}
                groupcategory={groupcategory}
                setprodstate={setprodstate}
                prodstate={prodstate}
                setprodstate2={setprodstate2}
                prodstate2={prodstate2}
                prodstatechange={prodstatechange}
                setcity={setcity}
                setcity2={setcity2}
                city={city}
                city2={city2}
                productdescription={productdescription}
                setproductdescription={setproductdescription}
              />
            )}

            {step == 1 && (
              <Product2
                setapp={setapp}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                isFilePicked={isFilePicked}
                setIsFilePicked={setIsFilePicked}
                selectedFile2={selectedFile2}
                setSelectedFile2={setSelectedFile2}
                isFilePicked2={isFilePicked2}
                setIsFilePicked2={setIsFilePicked2}
                selectedFile3={selectedFile3}
                setSelectedFile3={setSelectedFile3}
                isFilePicked3={isFilePicked3}
                setIsFilePicked3={setIsFilePicked3}
                extension1={extension1}
                setextension1={setextension1}
                extension2={extension2}
                setextension2={setextension2}
                extension3={extension3}
                setextension3={setextension3}
                handleSubmission={handleSubmission}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
