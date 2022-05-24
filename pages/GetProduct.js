import Head from "next/head";

import SideNav from "./Component/sidenav";
import { SelectField } from "./Component/SelectField";
import { useState, useContext, useRef } from "react";
import { NextResponse } from "next/server";
import Router from "next/router";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Select from "react-select";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import Dialog2 from "./Component/Dialog2";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/user";
import Swal from "sweetalert2";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import Link from "next/link";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function GetProduct({ data }) {
  const ref = useRef(null);
  const router = useRouter();
  const [options, setValue] = useState([]);
  const [Message, setMessage] = useState("");
  const [ShowDialog, setDialog] = useState(false);
  const [userid, setuserid] = useState();
  const [products, setProducts] = useState([]);
  const [productdetail, setproductdetail] = useState([]);
  const [filters1, setFilters1] = useState(null);
  const [displayBasic, setdisplayBasic] = useState(false);

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  //  Router.push('/')

  const hidedialog = () => setDialog(false);

  const options2 = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  //  Router.push('/')

  const handleChange = (selectedOption) => {
    // this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  useEffect(() => {
    // console.log("user")
    let k2 = typeof window !== "undefined" ? localStorage.getItem("user") : "";
    const obj = JSON.parse(k2);
    if (k2) {
      console.log(obj.user.userid);
      setuserid(obj.user.userid);
    }

    const body2 = JSON.stringify({ userid: obj.user.userid });

    console.log("body ");
    console.log(body2);

    console.log("about to ");

    const fetchData = async () => {
      try {
        const res = await fetch("/api/product/getProduct", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Accept: "application/json",
          },
          body: body2,
        });

        const data = await res.json();

        console.log("prod data");
        console.log(data);
        setProducts(data);
        initFilters1();

        if (data.message == "Not authenticated") {
          //   alert(data.message)
          router.push("/Logout");
          return;
        }
      } catch (e) {}
    };

    fetchData();
  }, []);

  const formatCurrency = (value) => {
    console.log(" currency value");
    console.log(value);

    var myNumeral = numeral(value);

    return myNumeral.format("0,0.00");

    //return new Intl.NumberFormat('en-IN', {style: 'currency',currency: 'NGR', minimumFractionDigits: 2}).format(value);

    //return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const clearFilter1 = () => {
    initFilters1();
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
    setGlobalFilterValue1("");
  };

  function rowColumnClick(rowData) {
    setproductdetail(rowData);
    setdisplayBasic(true);

    //  alert (rowData.id)
    console.log(rowData);
  }

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    console.log("_filters1");
    console.log(_filters1);

    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const dateTemplate = (rowData, column) => {
    return (
      <div>
        <a onClick={() => rowColumnClick(rowData)}>Click</a>
      </div>
    );
  };

  const dateTemplate2 = (rowData, column) => {
    return (
      <div>
        <Link
          href="/EditProduct/['{rowData.id} ] "
          as={"/EditProduct/" + rowData.id}
        >
          <a>Edit</a>
        </Link>
      </div>
    );
  };

  const dateTemplate3 = (rowData, column) => {
    return (
      <div>
        <Link
          href="/DeleteProd/['{rowData.id} ] "
          as={"/DeleteProd/" + rowData.id}
        >
          <a>Delete</a>
        </Link>
      </div>
    );
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={clearFilter1}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header1 = renderHeader1();

  return (
    <>
      <div className="container-fluid  row flex-nowrap">
        <SideNav />
        <div>
          <Dialog
            header="Header"
            visible={displayBasic}
            style={{ width: "50vw" }}
            footer={displayBasic}
            onHide={() => setdisplayBasic(false)}
          >
            <table className="table">
              <tr>
                <td>
                  {" "}
                  <Image
                    src={`http://localhost:3000/${productdetail.imageUrl} `}
                    template="Preview Content"
                    alt="Image Text"
                  />{" "}
                </td>
              </tr>

              <tr>
                <td>
                  {" "}
                  <Image
                    src={`http://localhost:3000/${productdetail.imageUrl2} `}
                    template="Preview Content"
                    alt="Image Text"
                  />{" "}
                </td>
              </tr>

              <tr>
                <td>
                  {" "}
                  <Image
                    src={`http://localhost:3000/${productdetail.imageUrl3} `}
                    template="Preview Content"
                    alt="Image Text"
                  />{" "}
                </td>
              </tr>
            </table>
          </Dialog>

          <DataTable
            value={products}
            dataKey="id"
            header={header1}
            filters={filters1}
            filterDisplay="menu"
            globalFilterFields={[
              "name",
              "category.catname",
              "price",
              "subCategory.subname",
              "state.statename",
              "area.cityname",
              "productstatus.prodname",
            ]}
          >
            <Column
              field="name"
              header="Product Name"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column field="category.catname" header="Category "></Column>
            <Column
              field="price"
              header="Price"
              body={priceBodyTemplate}
            ></Column>
            <Column field="subCategory.subname" header="Sub Category"></Column>
            <Column field="state.statename" header="State"></Column>
            <Column field="area.cityname" header="City"></Column>
            <Column field="productstatus.prodname" header="Status"></Column>
            <Column
              field="View Image"
              header="View Images"
              body={dateTemplate}
            />
            <Column field="View Image" header="Edit" body={dateTemplate2} />

            <Column field="View Image" header="Delete" body={dateTemplate3} />
          </DataTable>
        </div>
      </div>
    </>
  );
}
