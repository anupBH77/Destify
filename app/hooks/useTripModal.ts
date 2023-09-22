import {create} from 'zustand'
interface tripModalStore{
    onOpen:()=>void,
    onClose:()=>void,
    isOpen:boolean
}
const useTripModal=create<tripModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}) 
}))
export default useTripModal
