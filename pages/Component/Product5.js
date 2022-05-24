import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState, useContext, useRef, useEffect } from "react";
import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { validateYupSchema } from "formik";
import { InputTextarea } from "primereact/inputtextarea";

export default function Product5({
  setproductname,
  productname,
  setproductstatus,
  productstatus,
  setprice,
  price,
  setapp,
  groupcategory,
  setGroupcategory,
  setprodstate,
  prodstate,
  setprodstate2,
  prodstate2,
  prodstatechange,
  setcity,
  setcity2,
  city,
  city2,
  setproductdescription,
  productdescription,
}) {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [prodnameerrors, setprodnameerrors] = useState("");
  const [proddescriptionerrors, setproddescriptionerrors] = useState("");
  const [groupcategoryerrors, setgroupcategoryerrors] = useState("");
  const [productstatuserrors, setproductstatuserrors] = useState("");
  const [priceerrors, setpriceerrors] = useState("");
  const [city2errors, setcity2errors] = useState("");

  // let errors = {};

  const status = [
    { name: "Brand New", code: "Brand New" },
    { name: "Fairly Used", code: "Fairly Used" },
  ];

  const validateprod = () => {
    if (!productname) {
      //errors.name = 'error';
      setprodnameerrors("errors");
    } else {
      setprodnameerrors("");
    }

    if (!productdescription) {
      //errors.name = 'error';
      setproddescriptionerrors("errors");
    } else {
      setproddescriptionerrors("");
    }

    if (!groupcategory) {
      //errors.name = 'error';
      setgroupcategoryerrors("errors");
    } else {
      setgroupcategoryerrors("");
    }

    if (!productstatus) {
      //errors.name = 'error';
      setproductstatuserrors("errors");
    } else {
      setproductstatuserrors("");
    }

    if (!price) {
      //errors.name = 'error';
      setpriceerrors("errors");
    } else {
      setpriceerrors("");
    }

    if (!city2) {
      //errors.name = 'error';
      setcity2errors("errors");
    } else {
      setcity2errors("");
    }

    if (
      !productname ||
      !productdescription ||
      !groupcategory ||
      !productstatus ||
      !price ||
      !city2
    ) {
      return;
    }

    setapp("next");
  };

  useEffect(() => {
    const fetchData2 = async () => {
      const res2 = await fetch("/api/category/getstate", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data2 = await res2.json();

      console.log("data 2");

      console.log(data2);

      setprodstate(data2);
    };

    fetchData2();

    const fetchData = async () => {
      try {
        const res = await fetch("/api/category/getcategory2", {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const data = await res.json();

        console.log("data value");
        console.log(data);

        // const data2 = await res2.json()

        //console.log('data')
        //console.log(data)

        if (data.message == "Not authenticated") {
          //   alert(data.message)
          router.push("/Logout");
          return;
        }
        let arraydata = [];
        let arraydata2 = {};

        //console.log("server data")

        // console.log(data)
        //arraydata.push({ value: '', label: 'Chocolate'})
        //const obj2 = { value: '', label: 'Select Subcategory'};
        //arraydata.push(obj2)
        // data.map(function(item, i){
        // const obj = { value: item.id, label: item.Name};

        let k3 = [];

        for (let i = 0; i < data.length; i++) {
          let k2 = {};
          let k4 = [];

          k2 = { value: data[i].id, label: data[i].catname };

          for (let j = 0; j < data[i].subcategory.length; j++) {
            k4.push({
              value: data[i].subcategory[j].id,
              label: data[i].subcategory[j].subname,
            });

            console.log("k2");
            //  console.log(k2)
          }
          k2.items = k4;
          k3.push(k2);
        }

        setCategory(k3);

        //console.log("k3")
        //console.log(k3)
        // arraydata.push(obj)
        //})

        //console.log('arraydata')

        //console.log(arraydata)

        //  setValue(arraydata)
      } catch (e) {}
    };

    fetchData();
  }, []);

  return (
    <>
      <Fieldset legend="Delete  Product">
        <div>
          <form
            style={{ display: "flex", flexDirection: "column", width: "500px" }}
          >
            <div style={{ width: "100%" }}>
              <span
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
                className="p-float-label"
              >
                <InputText
                  className={`${
                    prodnameerrors === "errors" ? "p-invalid" : ""
                  }`}
                  style={{ flexGrow: "1" }}
                  id="in"
                  value={productname}
                  onChange={(e) => setproductname(e.target.value)}
                />
                <label htmlFor="in">Product Name</label>
              </span>
            </div>

            <div style={{ width: "100%" }}>
              <span
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
                className="p-float-label"
              >
                <InputTextarea
                  placeholder="Product Description"
                  className={`${
                    proddescriptionerrors === "errors" ? "p-invalid" : ""
                  }`}
                  rows={5}
                  cols={30}
                  style={{ flexGrow: "1", marginTop: "20px" }}
                  value={productdescription}
                  onChange={(e) => setproductdescription(e.target.value)}
                />
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <Dropdown
                placeholder="Select a Category"
                className={`${
                  groupcategoryerrors === "errors" ? "p-invalid" : ""
                }`}
                style={{ flexGrow: "1", marginTop: "20px" }}
                value={groupcategory}
                options={category}
                onChange={(e) => setGroupcategory(e.value)}
                optionLabel="label"
                optionGroupLabel="label"
                filter
                showClear
                optionGroupChildren="items"
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <Dropdown
                className={`${
                  productstatuserrors === "errors" ? "p-invalid" : ""
                }`}
                style={{ flexGrow: "1", marginTop: "20px" }}
                optionLabel="name"
                showClear
                optionValue="code"
                value={productstatus}
                options={status}
                onChange={(e) => setproductstatus(e.value)}
                placeholder="Select a Product Status"
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <InputNumber
                className={`${priceerrors === "errors" ? "p-invalid" : ""}`}
                style={{ flexGrow: "1", marginTop: "20px" }}
                value={price}
                onValueChange={(e) => setprice(e.value)}
                mode="currency"
                currency="NGN"
                placeholder="Enter Price"
                locale="jp-JP"
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <Dropdown
                style={{ flexGrow: "1", marginTop: "20px" }}
                optionLabel="statename"
                showClear
                optionValue="id"
                value={prodstate2}
                options={prodstate}
                onChange={(e) => prodstatechange(e.value)}
                placeholder="Select a State"
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <Dropdown
                className={`${city2errors === "errors" ? "p-invalid" : ""}`}
                style={{
                  flexGrow: "1",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
                optionLabel="cityname"
                showClear
                optionValue="id"
                value={city2}
                options={city}
                onChange={(e) => setcity2(e.value)}
                placeholder="Select a City"
              />
            </div>

            <button
              type="button"
              onClick={() => validateprod()}
              className="btn btn-primary btn-block mb-4"
            >
              Next
            </button>
          </form>
        </div>
      </Fieldset>
    </>
  );
}
