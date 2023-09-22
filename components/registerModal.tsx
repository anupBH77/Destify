"use client"
import React from 'react'
import  countryList from 'country-list'
import Modal from './Modal'
import {  FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from "react-icons/ai";
import {useState} from 'react'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import Input from './Input'
import { toast } from 'react-hot-toast'
import Button from './Button'
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal'
const RegisterModal = () => {
  const a = countryList.getData()

  const [isLoading,setIsLoading] = useState(false)
  const {onClose,isOpen}= useRegisterModal();
  const loginmodal= useLoginModal();
  const {register,handleSubmit,formState:{errors}} =useForm<FieldValues>({defaultValues:{name:'',email:'',password:''}})
  const onSubmit: SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true);
    try{
      // console.log(data);
    const resp=await axios.post('pages/api/register',data)
      console.log(resp)
     
      toast.success("Signup successful.")
      onClose();
      loginmodal.onOpen();
    }catch(err){
      toast.error("something went wrong.")
    }
    setIsLoading(false);
  }
  return (
    <div>
        <Modal
        isLoading={isLoading}
        title='Register'
        modalClose={onClose}
        modalIsOpen={isOpen}
        >
          <Input
          
          required
          errors={errors}
          register={register}
          label='email'
          id='email'
          />
          <Input
          required
          errors={errors}
          register={register}
          label='name'
          id='name'
          />
          <Input
          required
          errors={errors}
          register={register}
          label='password'
          id='password'
          />
          <Button 
          label='Continue'
          onClick={handleSubmit(onSubmit)}
          />
          <Button 
          label='Continue with google'
          icon={FcGoogle}
          onClick={()=>{signIn('google')}}
          outline={true}
          />
          <Button 
          label='Continue with GitHub'
          icon={AiFillGithub}
          onClick={() => {signIn('github')}}
          outline={true}
          />

        </Modal>
    </div>
  )
}

export default RegisterModal