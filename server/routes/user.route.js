import express from 'express'
import { getData } from '../controller/user.control.js'

const router = express.Router()

router.get('/test',getData)

export default router