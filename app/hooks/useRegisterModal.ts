import {create} from 'zustand'
interface registerModalStore{
    onOpen:()=>void,
    onClose:()=>void,
    isOpen:boolean
}
const useRegisterModal=create<registerModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}) 
}))
export default useRegisterModal
