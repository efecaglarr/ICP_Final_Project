import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userSet = localStorage.getItem('profile')
        JSON.stringify(userSet)
        setUser(userSet)
    },[])

  return (
    <div>Profile is : {user}</div>
  )
}

export default Profile