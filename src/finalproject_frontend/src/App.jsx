import { Navigate, Route, Routes } from 'react-router-dom'
import { Container } from '@material-ui/core'

import { useState } from 'react'

import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import PetDetails from './components/PetDetails/PetDetails'
import Auth from './components/Auth/Auth'
import Profile from './components/Profile/Profile'
function App() {
	const [currentId, setCurrentId] = useState(0)
	return (
		<Container style={{backgroundColor: '#FEF9F5'}} maxWidth='lg'>
			<Navbar />
			<Routes>
				<Route path='/' element={<Navigate to={'/pets'} />} />
				<Route path='/pets' element={<Home currentId={currentId} setCurrentId={setCurrentId	} />} />
				<Route path='/pets/:id' element={<PetDetails />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/profile/:user' element={<Profile />} />
			</Routes>
		</Container>
	)
}

export default App
