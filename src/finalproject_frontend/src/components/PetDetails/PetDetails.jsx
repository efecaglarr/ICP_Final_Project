import React from 'react'
import useStyles from './styles'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'

import LocationOn from '@mui/icons-material/LocationOn'

import { finalproject_backend } from 'declarations/finalproject_backend'
import CommentSection from './CommentSection'

const PetDetails = () => {
	var { id } = useParams()
	id = parseInt(id, 10)
	const [petPost, setPetPost] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const classes = useStyles()

	const readPetPost = async (id) => {
		const postArray = await finalproject_backend.read(id)
		const post = postArray[0]
		return post
	}
	useEffect(() => {
		setIsLoading(true)
		const fetchData = async () => {
			try {
				const post = await readPetPost(id)
				if (post) setPetPost(post)
				setIsLoading(false)
			} catch (error) {
				console.error('Error fetching pet posts:', error)
			}
		}
		fetchData()
	}, [])

	if (!petPost) return null

	if (isLoading) {
		return (
			<Paper style={{ backgroundColor: '#FEF9F5'}} elevation={6} className={classes.loadingPaper}>
				<CircularProgress color='primary' size='3em' />
			</Paper>
		)
	}

	return (
		<Paper style={{ backgroundColor: '#FEF9F5' ,padding: '20px', borderRadius: '15px' }} elevation={6}>
			<div className={classes.card}>
				<div className={classes.section}>
					<Typography variant='h4' component='h4'>
						{petPost.title}
					</Typography>
					<Typography gutterBottom variant='body1' component='p'>
						{petPost.message}
					</Typography>
					<Typography variant='body2' >
						Created at : {moment(petPost.createdAt).fromNow()}
					</Typography>
					<Divider style={{ margin: '20px 0' }} />
					<Typography variant='body1'>
						<strong>Location :  {petPost.location} <LocationOn sx={{ verticalAlign: 'middle',width: '13px', marginBottom: '3px'}}/></strong>
					</Typography>
					<Typography variant='body1'>
						<strong>Description</strong>
					</Typography>
					<Typography variant='h6'>{petPost.description}</Typography>
					<Divider style={{ margin: '20px 0' }} />
					<Typography variant='body1'>
						<strong>Comments</strong>
					</Typography>
					<CommentSection petPost={petPost}/>
				</div>
				<div className={classes.imageSection}>
					<img
						className={classes.media}
						src={
							petPost.selectedFile ||
							'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
						}
						alt={petPost.title}
					/>
				</div>
			</div>
		</Paper>
	)
}

export default PetDetails
