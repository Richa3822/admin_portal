import React from 'react'
import ImgTag from '../atoms/ImgTag'
import { MdVpnKey } from "react-icons/md";
import { Link} from 'react-router-dom';
import List from '../atoms/List';


function ProfileFlyOut() {
  return (
    <div className='profile-fly-out d-flex flex-column justify-content-center align-items-center'>
      <ImgTag className='profil-img' imgUrl='/assets/images/avtar.png' altText={'user profile'}/>
      <div className='w-100 d-flex  justify-content-center text-light bg-dark'>
      <div className='profile-option d-flex'><Link to='/change-password'><List name='Change Password' children={<MdVpnKey  className='mr-4'/>}/></Link></div>
      </div>
    </div>
  )
}

export default ProfileFlyOut
