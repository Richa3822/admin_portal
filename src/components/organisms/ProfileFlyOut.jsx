import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import ImgTag from '../atoms/ImgTag'
import { MdVpnKey } from "react-icons/md";
import { Link} from 'react-router-dom';
import Logout from '../../services/Logout';
import List from '../atoms/List';


function ProfileFlyOut() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  function set(){
    setRedirectToLogin(true)
  }
  
    if (redirectToLogin) {
      return <Navigate to="/login" />;
    }

  return (
    <div className='profile-fly-out d-flex flex-column justify-content-center align-items-center'>
      <ImgTag className='profil-img' imgUrl='/assets/images/avtar.png' altText={'user profile'}/>
      <div className='w-100 d-flex  justify-content-center text-light bg-dark'>
      <div className='profile-option d-flex'><Link to='/change-password'><List name='Change Password' children={<MdVpnKey  className='mr-4'/>}/></Link></div>
      </div>
      <div className='profile-option d-flex'><p className='text-dark mt-3 logout-p' onClick={()=>{Logout();set()}}>Logout</p></div>
    </div>
  )
}

export default ProfileFlyOut
