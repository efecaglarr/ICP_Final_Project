import React, { useState, useEffect } from 'react'
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	ButtonBase,
} from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import moment from 'moment'
import useStyles from './styles'

import { useNavigate } from 'react-router-dom'
import LocationOn from '@mui/icons-material/LocationOn'

import { finalproject_backend } from 'declarations/finalproject_backend'

const Pet = ({ post, setCurrentId }) => {
	const classes = useStyles()
	const navigate = useNavigate()
	const [user, setUser] = useState(null)

	async function authInit() {
		const userSet = localStorage.getItem('profile')
		JSON.stringify(userSet)
		setUser(userSet)
	}

	const openPost = () => {
		navigate(`/pets/${post.id}`)
	}

	useEffect(() => {
		authInit()
	}, [])

	return (
		<Card className={classes.card} raised elevation={6}>
			<CardMedia
				className={classes.media}
				component='img'
				alt='Pet Image'
				image={post.selectedFile || null}
				title={post.title}
			/>
			<div className={classes.overlay}>
				<Typography variant='h6'> {post.title} </Typography>
				<Typography variant='body2'>
					{' '}
					{moment(post.createdAt).fromNow()}{' '}
				</Typography>
			</div>
			{post.author == user ? (
				<div className={classes.overlay2}>
					<Button
						style={{ color: 'white' }}
						size='small'
						onClick={() => {
							setCurrentId(post.id)
						}}
					>
						<MoreHorizIcon fontSize='medium' />
					</Button>
				</div>
			) : null}
			<ButtonBase className={classes.cardAction} onClick={openPost}>
				<Typography
					className={classes.title}
					variant='body1'
					color='textSecondary'
					component='p'
				>
					<LocationOn
						sx={{ verticalAlign: 'middle', width: '20px', marginBottom: '3px' }}
					/>{' '}
					{post.location}
				</Typography>
				<Typography className={classes.title} variant='h5' gutterBottom>
					{post.title}
				</Typography>
				<CardContent>
					<Typography
						className={classes.message}
						variant='body1'
						color='textSecondary'
						component='p'
					>
						{post.message}
					</Typography>
				</CardContent>
			</ButtonBase>
			{post.author == user ? (
				<CardActions className={classes.cardActions}>
					<Button
						size='small'
						color='primary'
						onClick={() => {
							finalproject_backend.delete(post.id)
						}}
					>
						<DeleteIcon fontSize='small' />
						Delete
					</Button>
				</CardActions>
			) : null}
		</Card>
	)
}

export default Pet
