"use client"
import React, { useCallback, useState } from 'react'
import Modal from './Modal'
import useTripModal from '@/app/hooks/useTripModal'
import Heading from './Heading'
import CatagoryInput from './inputs/catagoryInput'
import { categories } from './NevBar/Catagories'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CButton from './Button'
import { ArrowLeft } from 'lucide-react'
import CountrySelect from './inputs/CountrySelect'
import Counter from './inputs/Counter'
import { Calendar } from './ui/calendar'
import { DateRange } from 'react-day-picker'
import { useRouter, useSearchParams } from 'next/navigation'

import { formatISO } from 'date-fns'

import qs from 'query-string'
// import CategoryBox from './CatagoriesBox'
interface tripModalProps{
    modalIsOpen:boolean,
     title:string,
      modalClose:()=>void
}

const TripModal = ({modalIsOpen,title,modalClose}:tripModalProps) => {
   const router = useRouter()
    const [curstep,setcurStep ]= useState(0);
    const [searchData,setSearchData ]= useState({
        category:'',
        locationValue:{name:'',id:''},
        guestCount:1,
        roomCount: 1,
      bathroomCount: 1,
    })
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
//   const router = useRouter();
   
    const onNext=useCallback(()=>{
        setcurStep((value)=>value+1)
    },[curstep])
    const onBack=useCallback(()=>{
        setcurStep((value)=>value==0?0:value-1)
    },[curstep])
    enum steps{
        Catagories=0,
        location=1,
        date = 2,
        requirement=3,
    }

   
      
      
      const params = useSearchParams();
    //   const onSubmit = useCallback(async () => {
    //     if (curstep !== steps.requirement) {
    //       return onNext();

    //     }
    // },[])



    const onSubmit = useCallback(async () => {
        console.log(searchData)
        if (curstep !== steps.requirement) {
          return onNext();
        }
    
        let currentQuery = {};
    
        if (params) {
          currentQuery = qs.parse(params.toString())
        }
    
        const updatedQuery: any = {
          ...currentQuery,
          locationValue: searchData.locationValue.name,
          category:searchData.category,
          guesCount:searchData.guestCount,
          roomCount:searchData.roomCount,
          bathroomCount:searchData.bathroomCount
        };
    
        // if (date?.from) {
        //   updatedQuery.startDate = formatISO(date.from);
        // }
    
        // if (date?.to) {
        //   updatedQuery.endDate = formatISO(date.to);
        // }
    
        const url = qs.stringifyUrl({
            
          url: '/',
          query: updatedQuery,
        },{skipNull:true});
    
        setcurStep(steps.location);
        modalClose();
        router.push(url);
        setcurStep(0)
      }, 
      [
        curstep, 
        TripModal, 
        location, 
        router, 
        searchData,
        
        params
      ]);
    

      
    const ButtonGroup=<div>
    {(curstep==steps.Catagories )?(<CButton onClick={onNext} label="Next"></CButton>):curstep==steps.requirement?(<div> <CButton onClick={onBack} label='Back' icon={ArrowLeft} outline/> <CButton label='Finsih' onClick={onSubmit}/></div>):<div className=' justify-between gap-4 flex'> <CButton  onClick={onBack} label='Back' icon={ArrowLeft} outline/> <CButton label='Next' onClick={onNext}/></div>}
</div>
 let modalBodyContent
if(curstep==steps.date){
    modalBodyContent=(
        <Calendar
        disabled={undefined}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={(val)=>{setDate(val)}}
          numberOfMonths={2}
          className='w-full'
        />
    )
}
  if (curstep=== steps.requirement) {
    modalBodyContent= (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          onChange={(value) => setSearchData((val)=>{return {...val,guestCount:value}})}
          value={searchData.guestCount}
          title="Guests" 
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter 
          onChange={(value) => setSearchData((val)=>{return {...val,roomCount:value}})}
          value={searchData.roomCount}
          title="Rooms" 
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter 
          onChange={(value) =>  setSearchData((val)=>{return {...val,bathroomCount:value}})}
          value={searchData.bathroomCount}
          title="Bathrooms" 
          subtitle="How many bathrooms do you have?"
        />
      </div>
    )
  }

  if (curstep === steps.location) {
    modalBodyContent = (
    <div  className=' z-50'>
      <Heading
            title="Where is your place located?"
            subtitle="Help guests find you!"
          />
  <CountrySelect value={searchData.locationValue.name} onChange={(value)=> setSearchData((val)=>{return {...val,locationValue:value}})}/>
      </div>
    );
  }
    if(curstep==steps.Catagories){
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
                        setSearchData((val)=>{return {...val,category:category}})}
                    selected={searchData.category === item.label}
                    label={item.label}
                    icon={item.icon}
                  />
                </div>
              ))}
            </div>
          </div>
          )
  
      }
  return (
    <Modal  title='filter' modalIsOpen={modalIsOpen} modalClose={modalClose}>
        <div>
    {ButtonGroup}
    {modalBodyContent}
        </div>
    </Modal>
  )
}

export default TripModal