import React, { useState, useEffect } from 'react'
import { Typography, TextField, Paper, InputAdornment } from '@material-ui/core'
import Button from '@mui/material-next/Button'
import SendIcon from '@mui/icons-material/Send'
import CircularProgress from '@mui/material/CircularProgress'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FileBase from 'react-file-base64'

import { finalproject_backend } from 'declarations/finalproject_backend'

import useStyles from './styles'

const generateId = () => {
	const timestamp = Date.now()
	const nat32Value = timestamp % Math.pow(2, 32)
	return nat32Value
}

const Form = ({ currentId, setCurrentId }) => {
	const readPetPost = async (id) => {
		const postArray = currentId ? await finalproject_backend.read(id) : null
		const post = postArray ? postArray[0] : null // Access the object if it exists
		return post
	}

	const [isLoading, setIsLoading] = useState(false)

	const [postData, setPostData] = useState({
		title: '',
		message: '',
		selectedFile: '',
		createdAt: '',
		description: '',
		location: '',
		comments: [],
	})
	const classes = useStyles()

	useEffect(() => {
		setIsLoading(true)
		const fetchPost = async () => {
			const post = await readPetPost(currentId)
			if (post) setPostData(post)
			console.log(post)
			setIsLoading(false)
		}

		fetchPost()
	}, [currentId])

	const handleSubmit = (e) => {
		e.preventDefault()
		const postId = generateId()
		const currentDate = new Date();
		const formattedDate = currentDate.toISOString();
		const postDataWithId = { ...postData, id: postId , createdAt: formattedDate}
		const postDataWithCurrentId = { ...postData, id: currentId }

		if (currentId) {
			finalproject_backend.update(currentId, postDataWithCurrentId)
			clear()
		} else {
			finalproject_backend.create(postDataWithId)
			clear()
		}
	}

	const clear = () => {
		setCurrentId(null)
		setPostData({
			title: '',
			message: '',
			selectedFile: '',
			createdAt: '',
			description: '',
			location: '',
			comments: [],
		})
	}

	return (
		<Paper className={classes.paper} elevation={6}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'>{currentId ? `Edit` : `Create`} post </Typography>
				{isLoading ? (
					<CircularProgress
						color='success'
						sx={{
							width: 20,
							p: 7,
						}}
					/>
				) : (
					<>
						<TextField
							name='title'
							variant='outlined'
							label='Title'
							fullWidth
							value={postData.title}
							onChange={(e) => setPostData({ ...postData, title: e.target.value })}
						/>
						<TextField
							name='message'
							variant='outlined'
							label='Message'
							fullWidth
							value={postData.message}
							onChange={(e) => setPostData({ ...postData, message: e.target.value })}
						/>
						<TextField
							name='description'
							variant='outlined'
							label='Description'
							fullWidth
							multiline
							minRows={6}
							value={postData.description}
							onChange={(e) =>
								setPostData({ ...postData, description: e.target.value })
							}
						/>
						<TextField
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LocationOnIcon
											sx={{
												color: 'gray',
											}}
										/>
									</InputAdornment>
								),
							}}
							name='location'
							variant='outlined'
							label='Location'
							fullWidth
							value={postData.location}
							onChange={(e) => setPostData({ ...postData, location: e.target.value })}
						/>

						<div className={classes.fileInput}>
							<FileBase
								type='file'
								multiple={false}
								onDone={({ base64 }) =>
									setPostData({ ...postData, selectedFile: base64 })
								}
							/>
						</div>
						<Button
							className={classes.buttonSubmit}
							variant='filled'
							color='primary'
							size='large'
							type='submit'
							fullWidth
							endIcon={<SendIcon />}
						>
							Submit
						</Button>
						<Button
							variant='filled'
							color='secondary'
							size='small'
							onClick={clear}
							fullWidth
						>
							Clear
						</Button>
					</>
				)}
			</form>
		</Paper>
	)
}

export default Form
