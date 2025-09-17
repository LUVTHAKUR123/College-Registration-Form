import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

// Custom Components
import InputField from "../components/controller/InputField";
import SelectorFields from "../components/controller/SelectorFields";
import CheckBoxesField from "../components/controller/CheckBoxesField";
import TextAreaField from "../components/controller/TextAreaField";
import RadioBtn from "../components/controller/RadioBtn";

// Toasts
import { ToastError, ToastSuccess } from "../toastUtlits";

// Context
import { StudentContext } from "../context/StudentContext";


const validationSchema = Yup.object().shape({
  rollno: Yup.string().required("Roll No is required"),
  name: Yup.string().required("Name is required"),
  DOB: Yup.string().required("DOB is required"),
  contact: Yup.string().required("Contact is required"),
  courses: Yup.string().required("Courses is required"),
  department: Yup.array().min(1, "Select at least one department"),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
});

const initialValue = {
  name: "",
  courses: "",
  department: [],
  gender: "",
  rollno: "",
  contact: "",
  description: "",
  address: "",
  DOB: "",
};

function RegisterationForm({ defaultData }) {
  const { data, setData } = useContext(StudentContext);
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;

  const { handleSubmit, control, reset, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: editData || initialValue,
  });

  // Prefill form on mount if editing
  useEffect(() => {
    if (editData) {
      reset(editData);
      Object.entries(editData).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      // reset(initialValue);
      reset()
    }
  }, [editData, reset, setValue]);


  const onSubmit = (formData) => {
    if (editData) {

      const updatedList = data.map((item) =>
        item.id === editData.id ? { ...formData, id: editData.id } : item
      );
      setData(updatedList);
      ToastSuccess("Student data updated successfully");
    } else {

      const newEntry = { ...formData, id: uuidv4() };
      setData([...data,newEntry]);
      ToastSuccess("Student added successfully");
    }

    navigate("/")
  };


  const validationToastMsg = (errors) => {
    const messages = Object.values(errors).map((err) => err.message);
    if (messages.length) {
      ToastError(
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, validationToastMsg)}  style={{width:"50%", margin:"0 auto"}}>
      <h1
        style={{
          color: "#312f62ff",
          fontFamily: "cursive",
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        Student Registration Form
      </h1>

      <InputField
        label="Roll No:"
        control={control}
        name="rollno"
        type="text"
        placeholder="Enter the roll no"
      />
      <br />
      <InputField
        label="Name:"
        name="name"
        control={control}
        type="text"
        placeholder="Enter the name"
      />
      <InputField
        label="DOB:"
        name="DOB"
        placeholder="Enter the DOB"
        control={control}
        type="date"
      />
      <RadioBtn
        label="Gender:"
        name="gender"
        control={control}
        gender={["Male", "Female", "Other"]}
      />
      <br />
      <InputField
        label="Contact:"
        type="text"
        name="contact"
        control={control}
        placeholder="Enter the mobile number"
      />
      <br />
      <SelectorFields
        label="Courses:"
        name="courses"
        control={control}
        option={["BBA", "BCA", "MCA", "B.Sc", "B.Tech", "B.Com"]}
      />
      <CheckBoxesField
        label="Department:"
        name="department"
        control={control}
        options={[
          "IT",
          "CS",
          "Law",
          "Science",
          "Civil",
          "ECE",
          "Mechanical",
          "Arts",
        ]}
      />
      <TextAreaField
        label="Description:"
        name="description"
        placeholder="Write something about yourself"
        control={control}
      />
      <TextAreaField
        label="Address:"
        name="address"
        placeholder="Enter the address"
        control={control}
      />
      <Button variant="outlined" type="submit">
        {editData ? "Update" : "Submit"}
      </Button>
    </form>
  );
}

export default RegisterationForm;
