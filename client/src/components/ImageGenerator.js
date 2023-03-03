import React, { useState } from 'react'
import mailMan from '../images/painter.png'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Spinner from 'react-bootstrap/Spinner';
import { motion } from "framer-motion";
import { Button } from '@mui/material';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';



const ImageGenerator = () => {

  const [newsColor, setnewsColor] = useState(false);  
  const [spinner, setSpinner] = useState(false);
  const [image, setImage] = useState(true);
  const [alt, setAlt] = useState(false);

  const [aiRes, setAiRes] = useState("");


  const formik = useFormik({

    initialValues: {

      desc: ''

    },

    validationSchema: Yup.object({

      desc: Yup.string().max(100, 'Description must be less than 101 characters').required("Description is required"),

    }),

    onSubmit : async (values) =>{

      setSpinner(true);
      setImage(false);
      setAlt(true);

      const response = await fetch("https://openai-contact-form.herokuapp.com/image-gen", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({

          message: values.desc

        })

      });
      
      const data = await response.json();
      
      await setAiRes(data.message);
      setSpinner(false);

    }


  });

  return (
    <div className=' text-center h-full flex justify-center bg-gradient-to-tr from-green-200 to-green-600'>
        <div className='xl:w-2/3 w-11/12 mx-auto p-12 shadow-2xl bg-white rounded-3xl text-gray-500 my-8'>
        <div>
        <h1 className=' text-4xl font-bold flex items-center justify-center flex-col xl:flex-row-reverse'>

        <span >Image Generator</span>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 mx-2 mt-3 xl:!mt-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>


          

        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col  items-center justify-center px-8 m-8">

          <label className={`px-6 font-semibold w-96 text-center xl:text-center ${formik.touched.desc && formik.errors.desc? "text-red-400": ""}`}>{formik.touched.desc && formik.errors.desc? formik.errors.desc: 'Image Description'}</label>
          
          <div className='flex flex-col items-center justify-center '>

          <input type='text' placeholder='Enter the Image Description' name='desc' value={formik.values.desc} onChange={formik.handleChange} onBlur={formik.handleBlur} className='z-10 w-80 px-3 py-2 m-6 mt-3 outline-slate-500 border-2 border-gray-400 rounded-md placeholder:text-center'></input>
     
          {(spinner && <div className='z-10 flex-col'>

            <Spinner className='xl:my-3' animation="border" role="status" />

          </div>)}

        
          </div>

          <label className={`px-6 font-semibold text-center xl:text-left mt-3 xl:mt-0 ${formik.touched.message && formik.errors.message? "text-red-400": ""}`}>{formik.touched.message && formik.errors.message? formik.errors.message: 'Image'}</label>
          <div className='w-80 h-96 xl:w-2/3 xl:h-full z-10 p-6 m-6 mt-3 outline-slate-500 border-2 border-gray-400 rounded-md '>
          {(image && <div className='xl:flex xl:h-full justify-center items-center w-2/4 m-auto pt-16 xl:py-56'>

                <motion.img 

                initial={{ y: -10 }}
                    animate={{ y: 10 }}
                    transition={{
                    type: "smooth",
                    repeatType: "mirror",
                    duration: 2,
                    repeat: Infinity,
                    }}

                src={mailMan} alt='form-img' className='  xl:w-1/4 z-40'/>

                </div>)}

                {alt && (<div className='xl:flex xl:h-full justify-center items-center mx-auto'>
                    <motion.img 
                    
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                    type: "smooth",
                    duration: 0.8,
                    }}

                    src={aiRes} className=' rounded-3xl'/>
                </div>)}

          </div>
          
          

          <div className=' flex'>

          <button type='submit' className=' m-6 mt-3 w-30 bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-800 transition-colors duration-200 z-30'>
            Generate
          </button>

          <button onClick={()=>{formik.resetForm(); setAiRes("")}} type="reset" className='mb-3 z-30'>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-2 cursor-pointer hover:scale-110">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>

        </button>

        </div>
         
          
        </form>

        

        </div>

                    
        <motion.div className='flex justify-center items-center'>
        <Button component={Link} to='/' className=' !rounded-3xl hover:!text-green-500 ' sx={{backgroundColor:'#16a34a', color: 'white', width: '225px', margin: '2.2rem 0', padding: '10px 12px' }}
            onMouseEnter={() => setnewsColor(true)}
            onMouseLeave={() => setnewsColor(false)}
            
            color="tertiary"
            size="large"
            variant="elevated"
            startIcon={<BiIcons.BiNavigation className=' mb-1' style={{ color: newsColor ? '#16a34a' : 'white', transform: 'rotate(270deg)' }}/>}
        >Email Generator</Button></motion.div>



      </div>
    </div>
  )
}

export default ImageGenerator

//className={`px-6 font-semibold text-center xl:text-left mt-3 xl:mt-0 ${formik.touched.message && formik.errors.message? "text-red-400": ""}`}
//className='hidden xl:flex flex-col absolute right-0 top-0 h-full justify-center items-center pl-24  w-2/4'
//flex-col absolute right-0 top-0 