import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import PostItem from '../components/PostItem'

import axios from 'axios'

import Loader from '../components/Loader'



const CategoryPosts = () => {

  const { category } = useParams();

  const [posts, setPosts] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`)
        setPosts(response?.data)
      }
      catch(err){
        console.log(err)
      }

      setIsLoading(false)
    }

    fetchPosts();
  }, [category])

  if(isLoading){
    return <Loader />
  }

  return (
    <section className='posts'>
        {posts.length > 0 ? <div className="container posts_container">
            {
                posts.map(({ _id: id, thumbnail, category, title, description, creator, createdAt}) => <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} description={description} authorID={creator} createdAt={createdAt} />)
            }
        </div> : <h2 className='center'>No Posts Found</h2>}
    </section>
  )
}

export default CategoryPosts