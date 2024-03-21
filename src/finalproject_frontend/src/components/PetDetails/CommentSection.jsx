import React, { useState, useRef, useEffect } from 'react'
import {
	Typography,
	TextField,
	Button,
} from '@material-ui/core/'

import useStyles from './styles'
import { finalproject_backend } from 'declarations/finalproject_backend'
import { useParams } from 'react-router-dom'

const CommentSection = ({ petPost }) => {
	console.log(petPost);
	var { id } = useParams()
	id = parseInt(id, 10)
	const [post, setPostData] = useState(petPost)
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState(petPost.comments)

	const classes = useStyles()
	const commentsRef = useRef()

	const handleComment = async () => {
		const newComments = [...comments, comment]
		setComments(newComments)
		setComment('')
		const postDataWithComments = { ...post, comments: newComments }
		setPostData(postDataWithComments)

		await finalproject_backend.update(id, postDataWithComments)
		commentsRef.current.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		const fetchData = async () => {
            try {
                const post = await finalproject_backend.read(id)
                // if (post) setPostData(post)
            } catch (error) {
                console.error('Error fetching pet posts:', error)
            }
        }
        fetchData()
	},[comments])

	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>

					<Typography variant='body2'>
						<strong>{petPost.comments}</strong>
					</Typography>
					{/* {Array.isArray(comments) && comments.length > 0 ? (
						comments.map((c, i) => (
							<Typography key={i} gutterBottom variant='subtitle1'>
								<strong>{c.split(': ')[0]}</strong>
								{c.split(':')[1]}
							</Typography>
						))
					) : (
						<Typography variant='body2'>No comments yet.</Typography>
					)} */}
					<div ref={commentsRef} />
				</div>
				<div style={{ width: '70%' }}>
					<Typography gutterBottom variant='h6'>
						Write a comment
					</Typography>
					<TextField
						fullWidth
						multirows={4}
						variant='outlined'
						label='Comment'
						multiline
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
