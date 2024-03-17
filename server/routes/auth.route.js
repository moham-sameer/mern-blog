import express from 'express'
import { signin, signup } from '../controller/auth.control.js'
const router = express.Router()

router.route('/signup').post(signup)
router.route('/signin').post(signin)

export default router;