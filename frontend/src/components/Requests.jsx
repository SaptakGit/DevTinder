import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utlis/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utlis/requestSlice'

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try{
            const res = await axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id, 
                {}, 
                {withCredentials:true}
            );
            dispatch(removeRequest(_id));
        } catch(err){
            console.log(err);
        }
    }


    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received",{withCredentials:true});
            dispatch(addRequests(res?.data?.data));

        } catch(err){
            // Error
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if(!requests) return;

    if(requests.length === 0) return <h1 className='flex justify-center my-10'>No Requests Found</h1>;

    return (
    <div className='text-center my-10'>
        <h1 className='text-bold text-white text-3xl'>Connections Requests</h1>

        {requests.map((request) => {
            const {_id, firstName, lastName, photoUrl, age, gender, about} = request.fromUserId;

            
            return (
            <div className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-full mx-auto' key={_id}>
                <div>
                    <img alt="user-photo" className="w-20 h-20 rounded-full" src={photoUrl}/>
                </div>
                <div className='text-left mx-4'>
                    <h2 className='font-bold text-xl'>{firstName +" "+ lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                </div>
                <div>
                    <button className="btn btn-primary mx-2" onClick={() => reviewRequest('rejected', request._id)}>Reject</button>
                    <button className="btn btn-secondary mx-2" onClick={() => reviewRequest('accepted', request._id)}>Accept</button>
                </div>
            </div>
        )})}
    </div>
    );
}

export default Requests