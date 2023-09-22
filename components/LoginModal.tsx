"use client"
import React ,{useState,useCallback}from 'react'
import Modal from './Modal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Button from './Button'
import Input from './Input'
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import axios from 'axios'
import {signIn} from 'next-auth/react'
import { toast } from 'react-hot-toast'
import Router from 'next/router'
import { useRouter } from 'next/navigation'
import useRegisterModal from '@/app/hooks/useRegisterModal'

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
  
    const { 
      register, 
      handleSubmit,
      formState: {
        errors,
      },
    } = useForm<FieldValues>({
      defaultValues: {
        email: '',
        password: ''
      },
    });
    
    const onSubmit: SubmitHandler<FieldValues> = 
    (data) => {
      setIsLoading(true);
  
      signIn('credentials', { 
        ...data, 
        redirect: false,
      })
      .then((callback) => {
        setIsLoading(false);
  
        if (callback?.ok) {
          toast.success('Logged in');
          loginModal.onClose();
          router.refresh();
        }
        
        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    }
  
  return (
    <Modal
    
    title='Login'
    isLoading={isLoading}
    modalIsOpen={loginModal.isOpen}
    modalClose={loginModal.onClose}
    
    >
      
      
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
  
    <Button 
        label="Continue"
    
        onClick={handleSubmit(onSubmit)}
      />


      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() =>{signIn('google')}}
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {signIn('github')}}
      />
    


    </Modal>
  )
}



export default LoginModal