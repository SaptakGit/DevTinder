import React from 'react'

const UserListRow = ({userinfo}) => {
    //console.log(userinfo)
    const {_id, firstName, lastName, photoUrl, age, gender, emailId} = userinfo;

  return (
    <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={photoUrl}
                          alt="abc" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{firstName} {lastName}</div>
                    </div>
                  </div>
                </td>
                <td>
                {emailId}
                </td>
                <td>{gender}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">{age}</button>
                </td>
                <td>
                  <button className='btn btn-info btn-square'>action</button>
                </td>
              </tr>
  )
}

export default UserListRow