// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async (req, res) => {

  const  { postId } = req.query
  const postPayload = await fetchPost(postId)
  const commentPayload = await fetchComments(postId)
  const generatePhotoUrl = { imgUrl: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80' }
  const payload = Object.assign(postPayload, commentPayload, generatePhotoUrl)

  res.statusCode = 200
  res.json(payload)
}

const fetchPost = async (postId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  const { body } = await response.json()
  return { post: body}
}

const fetchComments = async (postId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
  const comments = await response.json()
  const formatedComments = comments.map(({postId, email, ...keepPart}) => keepPart)
  return { comments: formatedComments }
}

