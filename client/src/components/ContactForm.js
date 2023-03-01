import React, { useState } from 'react'
import mailMan from '../images/mail-man_4.png'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Spinner from 'react-bootstrap/Spinner';
import { motion } from "framer-motion";


const ContactForm = () => {

  const [spinner, setSpinner] = useState(false);

  const [aiRes, setAiRes] = useState("");

  const handleChange = (e) => {

    setAiRes(e.target.value);

  }

  const formik = useFormik({

    initialValues: {

      name: '',
      email: '',
      subject: '',

    },

    validationSchema: Yup.object({

      name: Yup.string().max(20, 'Name must be less than 21 characters').required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      subject: Yup.string().max(150, 'Subject must be less than 151 characters').required("Subject is required"),

    }),

    onSubmit : async (values) =>{

      setSpinner(true);

      const response = await fetch("https://openai-contact-form.herokuapp.com/", {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({

          message: "Write an email with the subject " + values.subject

        })

      });
      
      const data = await response.json();
      await setAiRes(data.message);
      setSpinner(false);

    }


  });

  return (
    <div className=' h-full flex justify-center flex-col bg-gradient-to-tr from-green-200 to-green-600'>
        <div className='xl:w-2/3 w-11/12 mx-auto p-12 shadow-2xl bg-white rounded-3xl text-gray-500 relative my-8'>
        <div>
        <h1 className=' text-4xl font-bold flex items-center justify-center xl:justify-start'>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 mx-2 mt-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>

          <span>Contact Us</span>

        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col xl:items-start items-center justify-center px-8 m-8">
          <label className={`px-6 font-semibold ${formik.touched.name && formik.errors.name? "text-red-400": ""}`}>{formik.touched.name && formik.errors.name? formik.errors.name: 'Name'}</label>
          <input type='text' placeholder='Enter your name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className='z-10 w-80 px-3 py-2 m-6 mt-3 outline-slate-500 border-2 border-gray-400 rounded-md'></input>
          <label className={`px-6 font-semibold ${formik.touched.email && formik.errors.email? "text-red-400": ""}`}>{formik.touched.email && formik.errors.email? formik.errors.email: 'Email'}</label>
          <input type='email' placeholder='Enter your email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='z-10 w-80 px-3 py-2 m-6 mt-3 outline-slate-500 border-2 border-gray-400 rounded-md'></input>

          <label className={`px-6 font-semibold ${formik.touched.subject && formik.errors.subject? "text-red-400": ""}`}>{formik.touched.subject && formik.errors.subject? formik.errors.subject: 'Subject'}</label>
          
          <div className='flex flex-col items-center xl:flex-row xl:items-start'>

          <input type='text' placeholder='Enter the subject' name='subject' value={formik.values.subject} onChange={formik.handleChange} onBlur={formik.handleBlur} className='z-10 w-80 px-3 py-2 m-6 mt-3 outline-slate-500 border-2 border-gray-400 rounded-md'></input>
     
          {(spinner && <div>

            <Spinner className='xl:mt-6' animation="border" role="status" />

          </div>)}

          </div>
          
          <label className={`px-6 font-semibold mt-3 xl:mt-0 ${formik.touched.message && formik.errors.message? "text-red-400": ""}`}>{formik.touched.message && formik.errors.message? formik.errors.message: 'Message'}</label>
          <textarea rows={15} placeholder="Enter the subject and click on 'Generate' to let AI generate a mail for you" name='message' value={aiRes} onChange={handleChange} onBlur={formik.handleBlur} className='w-80 xl:w-3/6 z-10 px-3 py-2 m-6 mt-3 outline-slate-500 border-2 border-gray-400 rounded-md resize-none'></textarea>

          <div className=' flex'>

          <button type='submit' className=' m-6 mt-3 w-30 bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-800 transition-colors duration-200'>
            Generate
          </button>

          <button onClick={()=>{formik.resetForm(); setAiRes("")}} type="reset" className='mb-3'>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-2 cursor-pointer hover:scale-110">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>

        </button>

        </div>
         
          
        </form>
        </div>
        <div className='hidden xl:flex flex-row-reverse absolute right-0 top-0 h-full justify-center items-center pl-24 bg-gradient-to-r from-white to-green-100 rounded-lg opacity-85 shadow-green-300 w-2/4'>

        <motion.img 
        
        initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{
              type: "smooth",
              repeatType: "mirror",
              duration: 2,
              repeat: Infinity,
            }}
        
        src={mailMan} alt='form-img' style={{ width: '80%'}} />

        </div>

      </div>
    </div>
  )
}

export default ContactForm