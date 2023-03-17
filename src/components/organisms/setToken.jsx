import { useEffect, useState } from 'react';
import { useParams, useNavigate, json } from 'react-router-dom';
import { getData } from '../../services/Api';

function ResetToken({path}) {
  console.log(path);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();
  
  useEffect(() => {
    getData(`password/${token}`).then((res) => {
      if (res.msg) {
        localStorage.setItem('setpwd', JSON.stringify({token : token , isSet: false}));
        navigate(`/${path}`);
      } else if (res.error) {
        setError(res.error);
      }
    });
  }, [token, navigate]);

  return (
    <>
      {error && <h3>{error}</h3>}
    </>
  );
}

export default ResetToken;
