import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import UserLogout from './pages/UserLogout'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserMain from './pages/UserMain'
import RideSelect from './pages/RideSelect'
import FindingDriver from './pages/FindingDriver'
import RideTracking from './pages/RideTracking'
import RideComplete from './pages/RideComplete'
import UserWallet from './pages/UserWallet'
import { RideContext } from './context/RideContext'

const RideGuard = ({ children }) => {
  const { pickup, destination } = useContext(RideContext)
  if (!pickup || !destination) {
    return <Navigate to='/home' replace />
  }
  return children
}

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route
          path='/home'
          element={
            <UserProtectWrapper>
              <UserMain />
            </UserProtectWrapper>
          }
        />
        <Route
          path='/ride/select'
          element={
            <UserProtectWrapper>
              <RideGuard>
                <RideSelect />
              </RideGuard>
            </UserProtectWrapper>
          }
        />
        <Route
          path='/ride/finding'
          element={
            <UserProtectWrapper>
              <RideGuard>
                <FindingDriver />
              </RideGuard>
            </UserProtectWrapper>
          }
        />
        <Route
          path='/ride/tracking'
          element={
            <UserProtectWrapper>
              <RideGuard>
                <RideTracking />
              </RideGuard>
            </UserProtectWrapper>
          }
        />
        <Route
          path='/ride/complete'
          element={
            <UserProtectWrapper>
              <RideGuard>
                <RideComplete />
              </RideGuard>
            </UserProtectWrapper>
          }
        />
        <Route
          path='/user/wallet'
          element={
            <UserProtectWrapper>
              <UserWallet />
            </UserProtectWrapper>
          }
        />
        <Route path='/captainlogin' element={<CaptainLogin />} />
        <Route
          path='/user/logout'
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
      </Routes>
    </div>
  )
}

export default App
