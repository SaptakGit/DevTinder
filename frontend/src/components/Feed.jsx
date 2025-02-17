import React, { useEffect } from 'react'
import { BASE_URL } from '../utlis/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utlis/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispath = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials:true});
      dispath(addFeed(res?.data?.data));
    } catch(err){
      console.log(err.message);
    }
  };

useEffect(() =>{
  getFeed();
}, []);
  if(!feed) return;

  if(feed.length <= 0) return <h1 className='flex justify-center my-10'>No New User Found</h1>

  return (
    feed && (<div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>)
  )
}

export default Feed