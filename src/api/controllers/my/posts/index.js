import nc from 'next-connect'

import { Post } from '@/db/models'

const myPostsIndex = async (req, res) => {
  const { query } = req
  const { currentUser } = res

  const page = query.page || 1
  const limit = 5
  const offset = (page - 1) * limit
  const sortField = query.sortField || 'createdAt'
  const sortOrder = query.sortOrder || 'DESC'

  const myPosts = await Post.findAll({
    where: {
      UserId: currentUser.id
    },
    offset,
    limit,
    order: [[sortField, sortOrder]]
  })

  res.status(200).json({ myPosts })
}

export default nc()
  .use(myPostsIndex)
