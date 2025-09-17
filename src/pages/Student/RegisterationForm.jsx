import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation } from "react-router-dom";
import { StudentContext } from "../../context/StudentContext";
import { ToastError,ToastSuccess } from "../../toastUtlits";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
 import InputField from "../../components/controller/InputField";
import SelectorFields from "../../components/controller/SelectorFields";
import CheckboxesField from "../../components/controller/CheckBoxesField";
import RadioBtn from "../../components/controller/RadioBtn";
import TextAreaField from "../../components/controller/TextAreaField";
import { Button } from "@mui/material";

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

const RegisterationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addStudent, updateStudent } = useContext(StudentContext);
  const editData = location.state?.editData;

  const { handleSubmit, control, reset, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: editData || {
      name: "",
      courses: "",
      department: [],
      gender: "",
      rollno: "",
      contact: "",
      description: "",
      address: "",
      DOB: "",
    },
  });

  useEffect(() => {
    if (editData) {
      Object.entries(editData).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      reset();
    }
  }, [editData, reset, setValue]);

  const onSubmit = (formData) => {
    if (editData) {
      updateStudent({ ...formData, id: editData.id });
      ToastSuccess("Student updated successfully");
    } else {
      addStudent({ ...formData, id: uuidv4() });
      ToastSuccess("Student added successfully");
    }
    navigate("/");
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
    <form onSubmit={handleSubmit(onSubmit, validationToastMsg)}>
      <h1>Student Registration Form</h1>
      <InputField label="RollNo :" name="rollno" control={control} type="text" placeholder="Enter the roll no" />
      <InputField label="Name :" name="name" control={control} type="text" placeholder="Enter the name" />
      <InputField label="DOB :" name="DOB" control={control} type="date" />
      <RadioBtn label="Gender :" name="gender" control={control} gender={["Male", "Female", "Other"]} />
      <InputField label="Contact :" name="contact" control={control} type="text" placeholder="Enter the contact" />
      <SelectorFields label="Courses :" name="courses" control={control} option={["BBA", "BCA", "MCA", "B.Sc", "B.Tech", "B.Com"]} />
      <CheckboxesField label="Department :" name="department" control={control} options={["IT", "CS", "Law", "Science", "Civil", "ECE", "Mechanical", "Arts"]} />
      <TextAreaField label="Description :" name="description" control={control} placeholder="Write something..." />
      <TextAreaField label="Address :" name="address" control={control} placeholder="Enter address" />
      <Button type="submit" variant="outlined">{editData ? "Update" : "Submit"}</Button>
    </form>
  );
};

export default RegisterationForm;

