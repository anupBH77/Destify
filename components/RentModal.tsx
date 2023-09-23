"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Modal from './Modal'
import Heading from './Heading';
import {ArrowLeft} from 'lucide-react'
import useRentaModal from '@/app/hooks/useRentModal';
import Button from './Button';
import {categories} from './NevBar/Catagories';
import { useRouter } from 'next/navigation';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import Input from './inputs/Input';
import CountrySelect from './inputs/CountrySelect';
import Counter from './inputs/Counter';
import ImageUpload from './inputs/ImageUpload';
import CatagoryInput from './inputs/catagoryInput';
// import Input from '../../destify-2/components/inputs/Input';
// import { Select } from '@radix-ui/react-select';
const RentModal = () => {
    const router = useRouter()
    useEffect(()=>{
        return ()=>{
            setcurStep(0);
        }
    },[])

 const [isLoading, setIsLoading]= useState(false);
    const rentModal= useRentaModal();
    const [currStep,setcurStep]=useState(0);


    const onNext=useCallback(()=>{
        setcurStep((value)=>value+1)
    },[currStep])
    const onBack=useCallback(()=>{
        setcurStep((value)=>value==0?0:value-1)
    },[currStep])

    
    enum steps{
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,

    }
    const { 
      register, 
      handleSubmit,
      setValue,
      watch,
      formState: {
        errors,
      },
      reset,
    } = useForm<FieldValues>({
      defaultValues: {
        category: '',
        location: '',
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: '',
        price: 1,
        title: '',
        description: '',
      }
    });
    const location = watch('location');
    const category = watch('category');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');


    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      })
    }
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      // const mod= {...data}
      console.log(data);
      if (currStep!== steps.PRICE) {
        return onNext();
      }
      
      setIsLoading(true);
  
      axios.post('/pages/api/listings', data)
   
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setcurStep(steps.CATEGORY)
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong.');
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }
    const ButtonGroup=<div>
        {(currStep==steps.CATEGORY )?(<Button onClick={onNext} label="Next"></Button>):currStep==steps.PRICE?(<div> <Button onClick={onBack} label='Back' icon={ArrowLeft} outline/> <Button label='Finsih' onClick={handleSubmit(onSubmit)}/></div>):<div className=' justify-between gap-4 flex'> <Button  onClick={onBack} label='Back' icon={ArrowLeft} outline/> <Button label='Next' onClick={onNext}/></div>}
    </div>
    let modalBodyContent=<div></div>;
    if(currStep==steps.CATEGORY){
        modalBodyContent = (
            <div className="flex flex-col gap-8">
              <Heading
                title="Where is your place located?"
                subtitle="Help guests find you!"
              />
            
            </div>
          );
    }
    const f=()=>{
      console.log("clock")
    }
    console.log()
    if (currStep === steps.LOCATION) {
        modalBodyContent = (
        <div  className=' z-50'>
          <Heading
                title="Where is your place located?"
                subtitle="Help guests find you!"
              />
      <CountrySelect value={location} onChange={(value)=>setCustomValue('location',value)}/>
          </div>
        );
      }
    if(currStep==steps.CATEGORY){
      modalBodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of these best describes your place?"
            subtitle="Pick a category"
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
          >
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CatagoryInput
                  onClick={(category) => 
                    setCustomValue('category', category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
        )

    }
      if (currStep=== steps.INFO) {
        modalBodyContent= (
          <div className="flex flex-col gap-8">
            <Heading
              title="Share some basics about your place"
              subtitle="What amenitis do you have?"
            />
            <Counter
              onChange={(value) => setCustomValue('guestCount', value)}
              value={guestCount}
              title="Guests" 
              subtitle="How many guests do you allow?"
            />
            <hr />
            <Counter 
              onChange={(value) => setCustomValue('roomCount', value)}
              value={roomCount}
              title="Rooms" 
              subtitle="How many rooms do you have?"
            />
            <hr />
            <Counter 
              onChange={(value) => setCustomValue('bathroomCount', value)}
              value={bathroomCount}
              title="Bathrooms" 
              subtitle="How many bathrooms do you have?"
            />
          </div>
        )
      }
    
      if (currStep === steps.IMAGES) {
        modalBodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Add a photo of your place"
              subtitle="Show guests what your place looks like!"
            />
            <ImageUpload
              onChange={(value) => setCustomValue('imageSrc', value)}
              value={imageSrc}
            />
          </div>
        )
      }
    
      if (currStep === steps.DESCRIPTION) {
        modalBodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="How would you describe your place?"
              subtitle="Short and sweet works best!"
            />
            <Input
              id="title"
              label="Title"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />
            <Input
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        )
      }
    
      if (currStep === steps.PRICE) {
        modalBodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Now, set your price"
              subtitle="How much do you charge per night?"
            />
            <Input
              id="price"
              label="Price"
              formatPrice 
              type="number" 
              disabled={isLoading}
              register={register}
              errors={errors}
              required
             /> 
          </div>
        )
      }
      return (
    <Modal isLoading title='Property details' modalIsOpen={rentModal.isOpen} modalClose={rentModal.onClose}>
        <div>

        {ButtonGroup}
        {modalBodyContent}
        </div>
    </Modal>
  )
}

export default RentModal