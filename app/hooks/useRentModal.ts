import { create } from "zustand";
interface rentModalStore{
    onOpen:()=>void,
    onClose:()=>void,
    isOpen:boolean
}
const useRentaModal = create<rentModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))
export default useRentaModal