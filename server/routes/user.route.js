import express from 'express'
import { getData, updateUser } from '../controller/user.control.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/test',getData)
router.put('/update/:userId',verifyToken,updateUser)
export default router