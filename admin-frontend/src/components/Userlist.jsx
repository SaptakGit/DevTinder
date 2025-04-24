import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL, BEARER_TOKEN } from '../utlis/constants';
import UserListRow from './UserListRow';
import UserListPagination from './UserListPagination';

const Userlist = () => {

  const [ allUserListData, setAllUserListData ] = useState([]);
  const [ totalUser, setTotalUser ] = useState(0);
  const [ userLimit, setUserLimit ] = useState(0);

  const getAllUserList = async (currPage = 1) => {
    try{
      const res = await axios.get(BASE_URL+"/userlist",{
        headers:{
          Authorization : `Bearer ${BEARER_TOKEN}`
        },
        params: {
          limit: 10,
          page: currPage
         },
        withCredentials : true
      })
      setAllUserListData(res);
      setTotalUser(res.data.totalUser);
      setUserLimit(res.data.limit)
    } catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getAllUserList()
  },[])
  
  return (
    <div className='mx-20 my-10'>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>email</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            {console.log(allUserListData)}
            {/*console.log(allUserListData.data)*/}
            {/*allUserListData.data && console.log(allUserListData.data.userList)*/}
            {/*allUserListData.data && console.log(allUserListData.data.userList.length)*/}
          
            {/* row 1 */}
            {allUserListData.data && allUserListData.data.userList.map((user, index) => 
              (<UserListRow userinfo={user} key={user._id} />)
            )
          }
          </tbody>
          {/* foot */}
          <tfoot>
            {allUserListData.data && 
              <UserListPagination allUserCount={totalUser} userLimit={userLimit} getAllUserListFunc={getAllUserList} />
            }
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default Userlist