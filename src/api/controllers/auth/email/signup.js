import nc from 'next-connect'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { User } from '@/db/models'
import session from '@/api/helpers/session'

const authEmailSignup = async (req, res) => {
  const user = await User.build({
    ...req.body
  })
  user.passwordHash = await bcrypt.hash(req.body.password, 10)
  await user.save()

  const token = crypto.randomBytes(64).toString('hex')
  await user.createAuthenticityToken({ token })

  req.session.set('token', token)
  await req.session.save()

  res.status(200).json({ currentUser: user })
}

export default nc()
  .use(session)
  .use(authEmailSignup)
