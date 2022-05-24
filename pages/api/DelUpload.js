import formidable from "formidable";
import { IncomingForm } from "formidable";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//import { promises as fs } from 'fs'
var fs = require("fs");
var mv = require("mv");
var vpath = "./public";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getdata(dd) {
  const Subcategory = await prisma.subcategory.findFirst({
    where: {
      id: {
        equals: dd, // Default mode
      },
    },
  });
}

export default async (req, res) => {
  var ProdDetail2 = {};

  //console.log('prodstatusid')
  //console.log(prodstatusid)
  //return

  //let sub =  await    getdata(ProdDetail2.groupcategory)

  //console.log("category id ")
  //console.log(categoryId)

  let newPath = "";
  let newPath2 = "";
  let newPath3 = "";

  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      try {
        ProdDetail2 = JSON.parse(fields.ProdDetail);
        console.log("ProdDetail2 last ");

        // console.log(ProdDetail2);
        //  return;

        // console.log(sub)
        //  console.log("ProdDetail2.userid")
        //  console.log('./public/uploads/FS_' + ProdDetail2.userid)

        //var dir = `./public/uploads/FS_${ProdDetail2.userid}`;
        var dir = `./public/`;

        //  newPath = `${dir}/${timestamp}${files.File.originalFilename}`;

        console.log("product path ");
        console.log(`${dir}${ProdDetail2.selectedFile}`);
        fs.unlinkSync(`${dir}${ProdDetail2.selectedFile}`);
        fs.unlinkSync(`${dir}${ProdDetail2.selectedFile2}`);
        fs.unlinkSync(`${dir}${ProdDetail2.selectedFile3}`);
        //  console.log('dir')
        //  console.log(dir)

        //  return

        // fs.ensureDirSync(dir);

        try {
          !fs.existsSync(dir) && fs.mkdirSync(dir);
        } catch (e) {
          console.log("got here 4");

          console.log("error");

          console.log(e);

          reject(e);
          return;
        }

        // if (!fs.existsSync(dir)){
        //   fs.mkdirSync(dir);
        // }
        //  if (!fs.exists(dir)){

        //    fs.mkdirSync(dir); //create new directory and write to it.

        // }
        // let newfilename=

        //  let timestamp = new Date().getTime().toString();
        //  var newPath = `./public/uploads/${files.File.originalFilename}`;
        //var newPath = `./public/uploads/${timestamp}${files.File.originalFilename}`;

        // console.log('New FilePath')
        // console.log(newPath2.substring('./public'.length))

        //  res.status(200).json({ fields, files })

        console.log("got here 55");
        resolve("Promise is resolved successfully.");
      } catch (e) {
        reject(e);
        return;
      }
    });
  });

  //console.log("ProdDetail2 values");
  //console.log(ProdDetail2);

  const deleteUser = await prisma.product.delete({
    where: {
      id: parseInt(ProdDetail2.prodid),
    },
  });

  console.log("got here 8");
  console.log("product deleted  successfully ");

  res.status(200).json({ deleteUser });

  await prisma.$disconnect();

  console.log("got here 17");
};
