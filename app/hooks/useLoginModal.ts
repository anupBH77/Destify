import {create} from 'zustand'
interface useLoginStore{
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void,
}
const useLoginModal= create<useLoginStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))
export default useLoginModal