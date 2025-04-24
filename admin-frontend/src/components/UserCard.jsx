import React from 'react'

const UserCard = ({info}) => {

  const {_id, firstName, lastName, photoUrl, age, gender } = info;
  return (
    <div className="card bg-base-200 w-72 mx-2 my-3 shadow-sm rounded-lg">
          <figure className='image-full'>
            <img
              src={photoUrl}
              alt="{firstName} {lastName}" />
          </figure>
          <div className="card-body h-1/4">
            <h2 className="card-title">{firstName} {lastName}</h2>
            <p>{age} {gender}</p>
          </div>
        </div>
  )
}

export default UserCard