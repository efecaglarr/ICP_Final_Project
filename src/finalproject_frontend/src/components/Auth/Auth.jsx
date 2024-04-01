import React, { useEffect, useState } from 'react'
import LoggedOut from './LoggedOut'
import { useAuth, AuthProvider } from './use-auth-client'

import LoggedIn from './LoggedIn'
import useStyles from './styles'
import { useNavigate } from 'react-router'

function Auth() {
	const { isAuthenticated, identity } = useAuth()
  const [hasReloaded, setHasReloaded] = useState(false);

	const classes = useStyles()

	return (
		<>
			<header className={classes.header} id='header'>
				<section id='status' className={`${classes.toast} ${classes.hidden}`}>
					<span id='content'></span>
					<button className={classes.closeButton} type='button'>
						<svg
							aria-hidden='true'
							className='w-5 h-5'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
								clipRule='evenodd'
							></path>
						</svg>
					</button>
				</section>
			</header>
			<main className={classes.pageContent} id='pageContent'>
				{isAuthenticated ? <LoggedIn /> : <LoggedOut />}
			</main>
		</>
	)
}

export default function AuthWrapper() {
	return (
		<AuthProvider>
			<Auth />
		</AuthProvider>
	)
}
