import React from 'react'

const UserListPagination = ({allUserCount, userLimit, getAllUserListFunc}) => {

    const totalPages = Math.ceil(allUserCount/userLimit)
    const totalPagesArray = Array.from({length: totalPages},(_,i) => i+1)

    //console.log(totalPages+' '+allUserCount+' '+userLimit);

    const paginateClick = (page) =>{
      getAllUserListFunc(page)
    }

    
  return (
    <tr>
              <th className='text-center' colSpan={6}>
                <div className="join">
                  {totalPagesArray.map((page,index) =>{
                      return <input className="join-item btn btn-square" type="radio" name="options" aria-label={page} key={page} onClick={() => paginateClick(page)} />
                  })}
                  {/*<input className="join-item btn btn-square" type="radio" name="options" aria-label="1"/>
                  <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
                  <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
                  <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />*/}
                </div>
              </th>
            </tr>
  )
}

export default UserListPagination