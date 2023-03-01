import React, {useState} from 'react'
import { motion} from "framer-motion";
import { Button } from '@mui/material';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';


const Linker = (props) => {

    const [newsColor, setnewsColor] = useState(false);

  return (
    <div className=' flex flex-col justify-end items-center w-11/12 xl:w-8/12 mx-auto p-4 xl:p-8 shadow-2xl bg-white rounded-3xl text-gray-500 relative my-4 xl:my-8'>

        <div>

        {props.icon}

        </div>

        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}} className="flex flex-col items-center justify-center" >

        <h3 className=' font-bold text-xl my-2 text-center'>
            {props.title}
        </h3>
        <p className=' font-normal text-lg text-center'>

            {props.content}

        </p>

        

        <motion.div className='flex justify-center items-center'>
        <Button component={Link} to={props.page} target="_blank" className=' !rounded-3xl hover:text-gray-500 ' sx={{backgroundColor:'#666e7a', color: 'white', width: '125px', margin: '2rem 0', padding: '6px 12px' }}
            onMouseEnter={() => setnewsColor(true)}
            onMouseLeave={() => setnewsColor(false)}
            
            color="tertiary"
            size="large"
            variant="elevated"
            startIcon={<BiIcons.BiNavigation className=' mb-1' style={{ color: newsColor ? '#6b7280' : 'white' }}/>}
        >Navigate</Button></motion.div>



        </motion.div>

    </div>
  )
}

export default Linker