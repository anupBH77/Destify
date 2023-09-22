'use client';

import { ScaleLoader } from "react-spinners";


const Loader = () => {
  return ( 
    <div
    className="
    mt-40
     -z-40
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <ScaleLoader
        
        color="#0074d9"
        
      />
    </div>
   );
}
 
export default Loader;