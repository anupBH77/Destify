"use client"
import { Popup } from "reactjs-popup";
import { XIcon } from "lucide-react";
import React from "react";
interface ModalProps {
    isLoading?:boolean
  title: string;
  children: React.ReactNode;
  modalIsOpen: boolean;
  modalClose: () => void;
}
const Modal: React.FC<ModalProps> = ({
  children,
  title,
  modalIsOpen,
  modalClose,
  isLoading
}) => {
  return (
    <Popup
    className=" bg-black transition z-0"
      open={modalIsOpen}
      closeOnDocumentClick
      onClose={() => {
        modalClose;
      }}
    >
      <div className="z-0 w-screen m-auto  bg-black bg-opacity-[40%] h-screen pt-2 flex justify-center items-center">
        <div className="z-0 rounded-lg  m-auto  bg-white h-full lg:h-auto md:h-auto shadow">
          {/* <div className=' flex border border-x-0 border-t-0 shadow-sm h-[10%]'> */}

          <div className=" flex  items-center  p-6 rounded-t justify-center relative border-b-[1px] shadow">
            { (<button
              className=" p-1 border-0  hover:opacity-70 transition  left-9"
                onClick={modalClose}
            >
              <XIcon className="w-5 h-5  border-gray-700  border rounded-sm"/>
            </button>)}
           
            <div className="text-lg font-semibold  w-full text-center   ">
              {title}
            </div>
          </div>
          <div  className=" p-5 ">
            {children}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default Modal;
