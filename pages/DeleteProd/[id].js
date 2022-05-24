import { useCookies } from "react-cookie";
import { serialize } from "react-cookie";
import Product5 from "../Component/Product5";
import Product6 from "../Component/Product6";

import SideNav from "../Component/sidenav";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Steps } from "primereact/steps";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/user";
import Swal from "sweetalert2";

export default function EditProduct() {
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
  const [prodid, setprodid] = useState([]);

  const [prodstate2, setprodstate2] = useState();
  const [city, setcity] = useState([]);
  const [city2, setcity2] = useState();

  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [selectedFile3, setSelectedFile3] = useState();

  const [selectedFiles, setSelectedFiles] = useState();
  const [selectedFiles2, setSelectedFiles2] = useState();
  const [selectedFiles3, setSelectedFiles3] = useState();
  const [isFilePicked2, setIsFilePicked2] = useState(false);

  const [isFilePicked3, setIsFilePicked3] = useState(false);

  const [groupcategory, setGroupcategory] = useState();

  const [extension1, setextension1] = useState();
  const [extension2, setextension2] = useState();
  const [extension3, setextension3] = useState();

  async function createFile(getfile) {
    fetch(getfile)
      .then((e) => {
        return e.blob();
      })
      .then((blob) => {
        let b = blob;
        b.lastModifiedDate = new Date();
        b.name = "";

        return b;
      });
  }

  useEffect(() => {
    //const post = posts[router.query.id];

    let k2 = typeof window !== "undefined" ? localStorage.getItem("user") : "";
    if (k2) {
      const obj = JSON.parse(k2);
      console.log(obj.user.userid);
      setuserid(obj.user.userid);
      // alert(userid);
    }
    if (router.isReady) {
      console.log("router.query");
      console.log(router.query);
      let prodid2 = router.query.id;
      setprodid(prodid2);
      const body2 = JSON.stringify({ prodid: prodid2 });

      // alert(router.query.id)
      const fetchData = async () => {
        try {
          const res = await fetch("/api/product/getProduct2", {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Accept: "application/json",
            },
            body: body2,
          });

          const data = await res.json();

          console.log("product detail ");

          console.log(data);

          setproductname(data[0].name);
          setproductdescription(data[0].description);
          setproductstatus(data[0].productstatus.prodname);
          setprice(data[0].price);
          setprodstate2(data[0].stateId);
          prodstatechange(data[0].stateId);
          setcity2(data[0].areaId);
          setGroupcategory(data[0].categoryId);
          console.log("file path fileData ");
          //const fileData = getfile(data[0].imageUrl,"image/Jpg")
          setSelectedFile(data[0].imageUrl);

          setSelectedFile2(data[0].imageUrl2);
          setSelectedFile3(data[0].imageUrl3);
        } catch (e) {}
      };

      fetchData();
    }
  }, [router.isReady]);

  const items = [{ label: "Step 1" }, { label: "Step 2" }];

  const handleSubmission = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append("File", selectedFiles);
          formData.append("File2", selectedFiles2);
          formData.append("File3", selectedFiles3);
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
              selectedFile,
              selectedFile2,
              selectedFile3,
              prodid,
            })
          );
          // API CALL

          fetch("http://localhost:3000/api/DelUpload/", {
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

          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Product  deleted.",
            "success"
          );
          router.push("/GetProduct");
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });

    // HANDLING FILE AS SENDING FILE INTO BACKEND
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
              <Product5
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
              <Product6
                setapp={setapp}
                selectedFile={selectedFile}
                selectedFiles={selectedFiles}
                setSelectedFile={setSelectedFile}
                setSelectedFiles={setSelectedFiles}
                isFilePicked={isFilePicked}
                setIsFilePicked={setIsFilePicked}
                selectedFile2={selectedFile2}
                selectedFiles2={selectedFiles2}
                setSelectedFile2={setSelectedFile2}
                setSelectedFiles2={setSelectedFiles2}
                isFilePicked2={isFilePicked2}
                setIsFilePicked2={setIsFilePicked2}
                selectedFile3={selectedFile3}
                selectedFiles3={selectedFiles3}
                setSelectedFile3={setSelectedFile3}
                setSelectedFiles3={setSelectedFiles3}
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
