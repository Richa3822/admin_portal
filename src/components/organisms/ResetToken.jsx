import { useEffect } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import {getData} from '../../services/Api'

function ResetToken() {
  const navigate = useNavigate();
  const { token } = useParams();
  localStorage.setItem('sellerToken', token);
  useEffect(()=>{
      getData(`password/${token}`).then((res)=>{
        if(res.msg){
            navigate('/reset-password');
            return;
        }else{
            return (<div>{res.err}</div>)
        }
      });
  },[token]);
}
export default ResetToken;