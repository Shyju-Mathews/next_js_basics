"use client"

import { useContext } from "react";
import DataContext from "../context/DataContext"

const Footer = () => {
  // const { name } = useContext(DataContext);
  return (
    <footer className="fixed inset-x-0 bottom-0 flex  flex-col items-center text-center text-black">
                <div className="w-full p-4 text-center bg-[rgba(200,203,200,0.54)]" /* style={{backgroundColor:'rgba(0, 0, 0, 0.2)'}} */>
                    © 2023 Shyju
                </div>
    </footer>
  )
}

export default Footer
