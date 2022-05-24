import formidable from "formidable";
import { IncomingForm } from "formidable";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//import { promises as fs } from 'fs'
var fs = require("fs");
var mv = require("mv");

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

  const Subcategory = await prisma.subcategory.findFirst({
    where: {
      id: {
        equals: ProdDetail2.groupcategory, // Default mode
      },
    },
  });

  const prodstatusid = await prisma.productstatus.findFirst({
    where: {
      prodname: {
        equals: ProdDetail2.productstatus, // Default mode
      },
    },
  });

  //console.log('prodstatusid')
  //console.log(prodstatusid)
  //return

  //let sub =  await    getdata(ProdDetail2.groupcategory)

  let categoryId = Subcategory.categoryId;
  let prodstatusid2 = prodstatusid.id;

  //console.log("category id ")
  //console.log(categoryId)

  var newPath = "";
  var newPath2 = "";
  var newPath3 = "";

  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      try {
        ProdDetail2 = JSON.parse(fields.ProdDetail);

        console.log("ProdDetail2");
        console.log(ProdDetail2);

        //   console.log('fields3')
        // console.log(ProdDetail2)

        // return

        //  console.log('Subcategory')
        //  console.log(Subcategory)

        //  console.log(ProdDetail2.userid)
        // return
        // return
        // console.log('files')
        //  console.log(JSON.stringify(files.File) )
        //  console.log(JSON.stringify(fields) )
        // return
        // return

        // console.log('got here 1')
        if (err) return reject(err);

        //  console.log('got here 2')
        //  console.log(fields, files)
        //  return
        //  console.log('FilePath')
        //  console.log(files.File.filepath)
        var oldPath = files.File.filepath;
        var oldPath2 = files.File2.filepath;
        var oldPath3 = files.File3.filepath;

        //  console.log('sub')
        // console.log(sub)
        //  console.log("ProdDetail2.userid")
        //  console.log('./public/uploads/FS_' + ProdDetail2.userid)

        var dir = `./public/uploads/FS_${ProdDetail2.userid}`;
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

        let timestamp = new Date().getTime().toString();
        //  var newPath = `./public/uploads/${files.File.originalFilename}`;
        //var newPath = `./public/uploads/${timestamp}${files.File.originalFilename}`;
        newPath = `${dir}/${timestamp}${files.File.originalFilename}`;
        newPath2 = `${dir}/${timestamp}${files.File2.originalFilename}`;
        newPath3 = `${dir}/${timestamp}${files.File3.originalFilename}`;

        // console.log('New FilePath')
        // console.log(newPath2.substring('./public'.length))
        mv(oldPath, newPath, function (err) {});

        mv(oldPath2, newPath2, function (err) {});

        mv(oldPath3, newPath3, function (err) {});

        //  res.status(200).json({ fields, files })

        console.log("got here 55");
        resolve("Promise is resolved successfully.");
      } catch (e) {
        reject(e);
        return;
      }
    });
  });

  console.log("ProdDetail2 values");
  console.log(ProdDetail2);
  const taskCreate = await prisma.product.create({
    data: {
      name: ProdDetail2.productname,
      imageUrl: newPath.substring("./public".length),
      imageUrl2: newPath2.substring("./public".length),
      imageUrl3: newPath3.substring("./public".length),
      description: ProdDetail2.productdescription,

      productstatusId: parseInt(prodstatusid2),
      categoryId: parseInt(categoryId),
      subcategoryId: ProdDetail2.groupcategory,
      stateId: parseInt(ProdDetail2.prodstate2),
      areaId: parseInt(ProdDetail2.city2),
      userId: parseInt(ProdDetail2.userid),
      price: parseInt(ProdDetail2.price),
    },
  });
  console.log("got here 8");
  console.log("product created successfully ");

  console.log(taskCreate);
  await prisma.$disconnect();
  res.status(200).json({ taskCreate });

  console.log("got here 7");
};
