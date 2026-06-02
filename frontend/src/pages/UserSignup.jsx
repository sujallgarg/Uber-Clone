import React from 'react'

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [UserData, setUserData] = useState({});

    const submitHandler = (e) =>{
        e.preventDefault()
        setUserData({
            email: email,
            password: password
        })
        console.log(UserData);
        setEmail('');
        setPassword('');
    }

  return (
    <div>UserSignup</div>
  )
}

export default UserSignup