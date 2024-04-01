import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthProvider, useAuth } from '../Auth/use-auth-client'
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Button,
	MenuItem,
	TextField,
} from '@mui/material'
import './styles.css'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'

const pages = ['ADOPT', 'PETS', 'ABOUT']

function Navbar() {
	const navigate = useNavigate()
	const [anchorElNav, setAnchorElNav] = useState(null)
	const [user, setUser] = useState(null)

	const { isAuthenticated, logout, whoamiActor } = useAuth()

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const openSign = () => {
		navigate(`/auth`)
	}

	const openProfile = () => {
		navigate(`/profile/${user}`)
	}

	const logoutUser = () => {
		logout()
		window.location.reload()
	}

	return (
		<AppBar
			position='static'
			style={{
				padding: '0px',
				margin: '0px',
				marginBottom: '10px',
				borderRadius: '50px',
				boxShadow: 'none',
				border: '2px solid #B5C0D0',
			}}
			sx={{ backgroundColor: '#FEF9F5' }}
			maxwidth='lg'
		>
			<Container maxWidth='lg'>
				<Toolbar disableGutters>
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='#app-bar-with-responsive-menu'
						sx={{
							mr: 10,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'sans-serif',
							fontWeight: 900,
							letterSpacing: '.2rem',
							color: 'black',
							textDecoration: 'none',
						}}
					>
						dPett 🐶
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='black'
						>
							<MenuIcon />
						</IconButton>

						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign='center'>{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant='h5'
						noWrap
						component='a'
						href='#app-bar-with-responsive-menu'
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'black',
							textDecoration: 'none',
						}}
					>
						dPett
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							justifyContent: 'center',
							display: { xs: 'none', md: 'flex' },
						}}
					>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'black', display: 'block' }}
							>
								{page}
							</Button>
						))}
					</Box>
					<TextField
						sx={[{ mr: 2 }, { display: { xs: 'none', md: 'flex' } }]}
						id='search-bar'
						className='text'
						label=''
						variant='outlined'
						placeholder='Search...'
						size='small'
						InputProps={{
							style: { color: 'black', borderColor: 'white', display: 'flex' },
							startAdornment: (
								<IconButton
									sx={{ display: { xs: 'none', md: 'flex' } }}
									type='submit'
									aria-label='search'
								>
									<SearchIcon style={{ fill: 'white' }} />
								</IconButton>
							),
						}}
					/>
					<button
						style={{
							marginRight: '5px',
						}}
					>
						<a
							onClick={() => {
								isAuthenticated ? logoutUser() : openSign()
							}}
							className='button_top'
						>
							{isAuthenticated ? 'Sign out' : 'Sign in'}
						</a>
					</button>
					{isAuthenticated && (
						<button>
							<a
								onClick={() => { openProfile() }}
								className='button_top'
							>
								{isAuthenticated && 'Profile'}
							</a>
						</button>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default function NavbarWrapper() {
	return (
		<AuthProvider>
			<Navbar />
		</AuthProvider>
	)
}
