import React, { useState, useRef, useEffect } from 'react'
import { Typography, TextField, Button } from '@material-ui/core/'
import useStyles from './styles'
import { finalproject_backend } from 'declarations/finalproject_backend'
import { useParams } from 'react-router-dom'



const CommentSection = ({ petPost }) => {
	const { id } = useParams()
	
	const idAsNat32 = parseInt(id, 10)
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState([])
	const [user, setUser] = useState(null)

	const classes = useStyles()
	const commentsRef = useRef()

	const generateId = () => {
		const timestamp = Date.now()
		const nat32Value = timestamp % Math.pow(2, 32)
		return nat32Value
	}


	const handleComment = async () => {
		const newComment = {
			id: generateId(),
			text: comment,
			author: user,
		}
		const newComments = [...comments, newComment]
		setComments(newComments)
		setComment('')

		const updatedPost = { ...petPost, comments: newComments }

		await finalproject_backend.update(idAsNat32, updatedPost)
		commentsRef.current.scrollIntoView({ behavior: 'smooth' })
	}

	const handleDeleteComment = async (commentId) => {
		const updatedComments = comments.filter((comment) => comment.id !== commentId)
		setComments(updatedComments)

		const updatedPost = { ...petPost, comments: updatedComments }

		await finalproject_backend.update(idAsNat32, updatedPost)
	}

	useEffect(() => {
		setComments(petPost.comments || [])
	}, [petPost])

	useEffect(() => {
		authInit()
	}, [])

	async function authInit() {
		const userSet = localStorage.getItem('profile')
		setUser(userSet)
	}

	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					{Array.isArray(comments) && comments.length > 0 ? (
						comments.map((comment) => (
							<div key={comment.id}>
								<Typography gutterBottom variant='subtitle1'>
									<strong>{comment.author}</strong>: {comment.text}
									<br/>
									ID is : {comment.id}
								</Typography>
								{user === comment.author && (
									<Button
										key={`delete-${comment.id}`}
										onClick={() => handleDeleteComment(comment.id)}
									>
										Delete
									</Button>
								)}
							</div>
						))
					) : (
						<Typography key='no-comments' variant='body2'>
							No comments yet.
						</Typography>
					)}
					<div ref={commentsRef} />
				</div>

				<div style={{ width: '70%' }}>
					<Typography gutterBottom variant='h6'>
						Write a comment
					</Typography>
					<TextField
						fullWidth
						multiline
						minRows={4}
						variant='outlined'
						label='Comment'
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<br />
					<Button
						style={{ marginTop: '10px' }}
						fullWidth
						disabled={!comment.length}
						color='primary'
						variant='contained'
						onClick={handleComment}
					>
						Comment
					</Button>
				</div>
			</div>
		</div>
	)
}

export default CommentSection
