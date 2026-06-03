import React, { createContext, useState } from 'react'

export const UserDataContext = createContext(null)

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    firstname: '',
  })

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext
