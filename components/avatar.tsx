import { UserCircle2Icon} from "lucide-react";
import Image from "next/image";

interface avatarProps{
    src: string | null | undefined ;
}
const Avatar:React.FC<avatarProps>=({src})=>{
    return(
        <>
            {src?(  <Image 
      className="rounded-full" 
      height="30" 
      width="30" 
      alt="Avatar" 
      src={src}
    />):(
        <UserCircle2Icon className='h-7 w-7 m-1 text-gray-500' />

    )}
        </>
          
         
    )
}
export default Avatar