import React from 'react'
import { Link } from 'react-router-dom'

const Anchor = (props) => {
  return (
    <div>

        <a className=' flex mx-10 cursor-pointer hover:text-gray-500 '><Link to={props.path}>{props.content}</Link></a>

    </div>
  )
}

export default Anchor