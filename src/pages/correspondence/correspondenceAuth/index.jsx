import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularLoader from 'components/CircularLoader';
//https://10.1.3.72/correspndence/validateToken?type=RCM&token=

const CorrespondanceAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const dashboard = queryParams.get('type');
  const token = queryParams.get('token');
  const [loader, setLoader] = useState(false);

  const validateUser = async () => {
    try {
      setLoader(true);
      const response = await axios.post('http://10.0.1.109:8181/GlobalCommandCenter/iCAN/validateUserDetails', {
        sessionId: token
      });
      if (response.status == 200) {
        if (dashboard == 'CDA') {
          navigate('/correspndence/dashboard');
        } else {
          navigate('/patient/payment');
        }
        setLoader(false);
        localStorage.setItem("correspondenceAutToken",token);
      }
      console.log(response.data, 'inside validate user');
    } catch (err) {
      setLoader(false);
      console.log(err, 'inside validate user');
      //setError(err.message || "Something went wrong");
    } finally {
      setLoader(false);
      //setLoading(false);
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  return(<>

  {loader ? <CircularLoader/> : null}
  
  </>);
};

export default CorrespondanceAuth;
