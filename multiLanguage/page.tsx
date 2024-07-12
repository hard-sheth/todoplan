"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
// import { AiOutlineUpload } from "react-icons/ai";
import { CustomForm, inputTypesDiff } from "searchinput_dynamic-form";
import { FileBifercation } from "../component/FileBifercation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
  const NameofForm = `Add Patient Record`;
  const formValue = (data: object) => {
    console.log(data, "data form");
  };
  const formvaluessubmit = (data: object) => {
    console.log(data, "form app");
  };
  const createForm: inputTypesDiff[] = [
    {
      name: "username",
      type: "text",
      placeholder: "Please enter your email or username.",
      lable: "Full Name *",
      validationobj: {
        required: {
          value: true,
          message: "Please Enter Full Name.",
        },
      },
      maininputclass: "col-12 col-md-12",
    },
    {
      type: "radio",
      name: "gender",
      lable: "Gender *",
      radioOptions: [
        { label: `Male`, value: "male" },
        { label: `Female`, value: "female" },
        { label: `Other`, value: "other" },
      ],
      placeForLabel: "inline",
      classinput: "col-12",
      maininputclass: "col-12 col-md-12",
      validationobj: {
        required: {
          value: true,
          message: `Please Select Gender.`,
        },
      },
    },
    {
      name: "agree",
      type: "checkbox",
      options: [
        {
          label: (
            <>
              {" "}
              I certify that I am at least 18 years old and that i agree to the{" "}
              <Link href={`/terms`}>Terms & Condition</Link> and{" "}
              <span className="text-primary border-bottom border-primary">
                Privacy Policy
              </span>
              . This service is for the India only.{" "}
            </>
          ),
        },
      ],
      maininputclass: "col-12 col-md-12",
    },
    {
      type: "file",
      accept: "image/png",
      clearable: true,
      isMulti: true,
      isPreview: true,
      name: "fileupload",
      uploadBtn: "Upload btn",
      maininputclass: "col-12 col-md-12",
      square: true,
    },
  ];
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [listFiles, setListFiles] = useState(undefined);
  function handleDragOver(event: any) {
    console.log(event, "handleDragOver");
    event.preventDefault();
    // const files = event.dataTransfer.files;
  }

  const closeAfter7 = () => toast("Will close after 7s", { autoClose: 7000 });

  function handleDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log(files, "handleDrop", event.dataTransfer);
    // // Process the dropped files
    for (let i = 0; i < files.length; i++) {
      console.log(files[i].name);
      const preview = URL.createObjectURL(files[i]);
      console.log(preview, "previewURL");
      setPreviewURL(preview);
    }
  }

  function handleFileChagne(event: any) {
    event.preventDefault();
    const files = event.target.files;
    console.log(files, "handleDrop", event.dataTransfer);
    // // Process the dropped files
    setListFiles(files);
  }

  function name(propertyname: string, files: File[] | File | null) {
    console.log(files, "propertyname", propertyname);

    // setListFiles(files)
  }

  const handleFetchData = () => {
    toast.promise(
      fetchData(),
      {
        pending: "Loading...",
        success: "Congratulations! date updated.",
        error: "Error fetching data",
      },
      { position: "bottom-right", autoClose: 2000 }
      // .then((message) => {
      //   toast.success("Congratulations! date updated.");
      // })
      // .catch((error) => {
      //   toast.error(error);
      // })
    );
  };

  function fetchData() {
    return new Promise((resolve, reject) => {
      // Simulate an asynchronous operation
      setTimeout(() => {
        if (Math.random() < 0.5) {
          resolve("Congratulations! date updated.");
        } else {
          reject("Error fetching data");
        }
      }, 1000);
    });
  }

  return (
    <div className="container">
      <ToastContainer
        // position="bottom-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
        // autoClose={8000}
      />
      <button onClick={handleFetchData} className="btn btn-light">Close after 7 seconds</button>
      <CustomForm
        formValues={formValue}
        formTitle={NameofForm}
        titlePosition="center"
        formDetails={createForm}
        formclass={`row row-cols-1 row-cols-md-2`}
        submitfn={formvaluessubmit}
        btnPosition="center"
        resetbtn={true}
      />
      {/* <div className="row">
        <label className="for-label">Upload Profile Pic</label>
        <div className="input-group border-dotted border-secondary w-100 py-1 mb-3">
          <label
            className="input-group-text col-3 col-md-2"
            htmlFor="inputGroupFile01"
          >
            Upload
          </label>
          <div className="col ps-3">Or drop files</div>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            hidden
          />
        </div>
      </div> */}
      {/* <div className="row" onDragOver={handleDragOver} onDrop={handleDrop}>
        <div className="border-dashed rounded text-center py-3 border-secondary">
          {previewURL && <img src={previewURL} alt="Preview" />}
          <IoMdCloudUpload size={150} color="#006FAC" />
          <p >Drag & drop your files here</p>
          <input type="file" hidden accept=".png" />
        </div>
      </div> */}

      {/* {listFiles&&<FileBifercation PropertyName="filesupdate" SortCategory={listFiles} UpdteValue={name} />}  */}

      {/* <div className="col-12">
       <input type="file" className="form-control" onChange={handleFileChagne} multiple value={listFiles} />
      </div> */}
    </div>
  );
}

export default page;
