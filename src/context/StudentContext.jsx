// import React, { createContext, useState, useEffect } from "react";
// import { defaultData } from "../DeafultData"; // adjust path

// export const StudentContext = createContext();

// const StudentProvider = ({ children }) => {
//   const [students, setStudents] = useState(defaultData);
//   const [data,setData]=useState(defaultData)

//   useEffect(() => {
//     // If you want to fetch from API later, do it here
//     setStudents(defaultData); // Initially load from static data
//   }, []);

//   const addStudent = (newStudent) => {
//     setStudents((prev) => [newStudent,...prev]);
//   };

//   const updateStudent = (updatedStudent) => {
//     setStudents((prev) =>
//       prev.map((student) =>
//         student.id === updatedStudent.id ? updatedStudent : student
//       )
//     );
//   };

//   const deleteStudent = (id) => {
//     setStudents((prev) => prev.filter((student) => student.id !== id));
//   };

//   return (
//     <StudentContext.Provider
//       value={{ students, addStudent, updateStudent, deleteStudent ,data,setData}}
//     >
//       {children}
//     </StudentContext.Provider>
//   );
// };

// export default StudentProvider;


// // import { createContext,useState,useEffect, Children } from "react";
// // import { defaultData } from "../DeafultData";

// // export const StudentContext = createContext();

// // const StudentProvider =({Children})=>{
// // const [students,setStudents]=useState(defaultData)
// // const [data,setData]=useState(defaultData)
// // useEffect(()=>{
// //     setStudents(defaultData)
// // },[])

// // const addStudent =(newStudent)=>{
// //    setStudents((prev)=>[newStudent,...prev]);
// // };

// // const updatedStudent = (updatedStudent)=>{
// //     setStudents((student)=>student.id === updatedStudent ? updatedStudent: student )
// // }

// // const deleteStudent =(id)=>{
// //     setStudents((prev)=>prev.filter((student)=>student.id == id))
// // };

// // return (
// //     <StudentContext.Provider value={{addStudent,updatedStudent,deleteStudent,students,data,setData}}>
// //         {Children}
// //     </StudentContext.Provider>
// // )
// // }
// // export default StudentProvider;




// context/StudentContext.js
import React, { createContext, useState } from "react";
import { defaultData } from "../DeafultData";

export const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [data, setData] = useState(defaultData); 

  return (
    <StudentContext.Provider value={{ data, setData }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider; 
