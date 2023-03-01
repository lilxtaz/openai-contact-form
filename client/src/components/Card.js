import React, { useState } from 'react'
import { motion} from "framer-motion";
import bitmoji from '../images/bitmoji.png'
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as SiIcons from 'react-icons/si';
import Grid from '@mui/material/Grid'; // Grid version 1
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Linker from './Linker';

const Card = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [downBtn, setDownBtn] = useState(true);


  return (
    <div className=' min-h-screen flex justify-center flex-col bg-gradient-to-tr from-green-200 to-green-600 px-2 xl:px-0'>
    <div className=' min-w-min xl:mx-auto px-8 py-4 xl:p-16 shadow-2xl bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl text-gray-500 relative my-4 xl:my-8'>

        <motion.div transition={{layout:{duration: 1.35, type: "spring"}}} layout onClick={()=>{setIsOpen(!isOpen);setDownBtn(!downBtn);}} className='w-full flex flex-col justify-center items-center' >

            <motion.img 
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{
              type: "smooth",
              repeatType: "mirror",
              duration: 2,
              repeat: Infinity,
            }}
            
            src={bitmoji} alt='bit-emoji' className='mb-4 max-w-max' />
            <motion.h1 layout="position" className=' text-4xl my-2' >{props.title}</motion.h1>
            {downBtn && (<motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <ArrowDropDownIcon fontSize='large' sx={{color: '#fffff'}}/>
            </motion.div>)}
            {isOpen && 
            (<div>
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.7}} className="flex items-center justify-center">

                <p className=' font-medium text-lg'>
                  Hi there my name is Talha!
                </p>

              </motion.div>

              <Grid className='flex '  rowSpacing={0}  container spacing={{ xs: 0, lg: 12 }}>

              <Grid item xs={12} md={6}>
              <Linker title='Github' content='Find me on Github' page='https://github.com/lilxtaz' icon={<AiIcons.AiFillGithub size={32} />}/>
              </Grid>
              <Grid item xs={12} md={6}>
              <Linker title='LinkedIn' content='Find me on LinkedIn' page='https://www.linkedin.com/in/talha-zaigham/' icon={<AiIcons.AiFillLinkedin size={32} />}/>
              </Grid>
              <Grid item xs={12} md={6}>
              <Linker title='Wellfound' content='Find me on Wellfound (formerly known as AngelList)' page='https://angel.co/u/talha-zaigham' icon={<BsIcons.BsFillBriefcaseFill size={32} />}/>
              </Grid>
              <Grid item xs={12} md={6}>
              <Linker title='Gmail' content='Contact me on Gmail' page='mailto:talha.zaigham2@gmail.com' icon={<SiIcons.SiGmail size={32} />}/>
              </Grid>

              </Grid>

              

              
            
            </div>
            
            
            )}

        </motion.div>

    
    </div>
    </div>
  )
}

export default Card

//<Button component={Link} to={props.page}  variant='text' ><KeyboardArrowRightIcon fontSize="small" sx={{opacity: '0'}}/>Explore<KeyboardArrowRightIcon fontSize="small"/></Button>
