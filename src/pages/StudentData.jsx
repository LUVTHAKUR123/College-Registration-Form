// pages/StudentData.jsx
import React, { useContext, useEffect, useState } from "react";
import { defaultData } from "../DeafultData";
import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../context";

function StudentData() {
  const navigate = useNavigate();
  const { data, setData } = useContext(StudentContext); 
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const formattedData = data?.map((student, index) => ({
      ...student,
      index: index + 1,
    })) || [];

    setRows(formattedData);
  }, [data]);

  const handleEdit = (row) => {
    navigate("/registerationForm", { state: { editData: row } });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const filtered = data.filter((item) => item.id !== id);
        setData(filtered);
        Swal.fire("Deleted!", "Student has been deleted.", "success");
      }
    });
  };

  const handleClickOpen = () => {
    navigate("/registerationForm", { state: { editData: null } });
  };

  const columns = [
    { field: "index", headerName: "Sr No", width: 90 },
    { field: "rollno", headerName: "Roll No", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "DOB", headerName: "DOB", width: 130 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "contact", headerName: "Contact", width: 120 },
    { field: "courses", headerName: "Courses", width: 120 },
    { field: "department", headerName: "Department", width: 140 },
    { field: "address", headerName: "Address", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ marginBottom: 16 }}
      >
        + Add Student
      </Button>

      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
        />
      </Paper>
    </>
  );
}

export default StudentData;
