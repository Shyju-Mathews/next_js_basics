"use client"
import React, { createContext, useContext, useState } from "react";

const DataContext = createContext<any>(undefined);

export const DataProvider = ({ children } : { children : React.ReactNode}) => {

    const copy_right_user = "Shyju Mathews";
    const [name] = useState(copy_right_user);

    return (
        <DataContext.Provider value={{ name }}>
            {children}
        </DataContext.Provider>
    )
}


export default DataContext;
// export const useAuth = () => {
//     const context = useContext(DataContext);
//     if (!context) {
//       throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
//   };