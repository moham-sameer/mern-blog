import express from 'express'
import { google, signin, signup } from '../controller/auth.control.js'
const router = express.Router()

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/google').post(google)
export default router;