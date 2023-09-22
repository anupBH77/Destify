import {create} from 'zustand'
interface useLoadingnStore{
    isLoading:boolean,
    setLoading:(bool:boolean)=>void,
    
}
const useLoading= create<useLoadingnStore>((set)=>({
    isLoading:false,
    setLoading:(bool)=>set({isLoading:bool}),
   
}))
export default useLoading