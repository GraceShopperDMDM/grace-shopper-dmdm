import React from 'react'

const SingleUser = (props) => {
  return (
    <div>
      <div>
        Name:
        <p>{props.user.username}</p>
      </div>
      <div>
        Email:
        <p>{props.user.email}</p>
      </div>
      <div>
        Address:
        <p>{props.user.address}}</p>
      </div>
    </div>
  )
}

export default SingleUser
