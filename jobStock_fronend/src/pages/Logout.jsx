import React, { useContext, useEffect } from 'react'
import {removeToken} from '../helper'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

function Logout() {
  const navigator = useNavigate();
  const UserContext = useContext(AuthContext);

useEffect( () => {
    removeToken();
    UserContext.setUser(null);
    navigator("/");
}, [navigator,UserContext])

}

export default Logout