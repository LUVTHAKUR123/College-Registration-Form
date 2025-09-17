// context/CombineContext.js
import React from "react";
import StudentProvider from "./StudentContext";

function CombineContext({ children }) {
  return (
    <StudentProvider>
      {children}
    </StudentProvider>
  );
}

export default CombineContext;
export { StudentContext } from "./StudentContext"; 
