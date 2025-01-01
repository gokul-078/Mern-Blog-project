import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

import axios from 'axios';

const DeletePost = ({postId: id}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false)

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  // redirect to login page for any user who isn't logged in.
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  }, [])

  const removePost = async () => {
    setIsLoading(true)
    try{
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if(response.status){
        if(location.pathname == `/myposts/${currentUser.id}`){
          navigate(0)
        }
        else{
          navigate('/')
        }
      }
      setIsLoading(false)
    }
    catch(error){
      console.log("Couldn't delete the post")
    }
  }

  if(isLoading){
    return <Loader />
  }


  return (
    <Link className='btn sm danger' onClick={() => removePost(id)}>Delete</Link>
  )
}

export default DeletePost