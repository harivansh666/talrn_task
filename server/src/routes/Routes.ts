import express from "express";
import { DeleteDeveloper, EditDeveloper, GetDevelopers, GetDevelopersbyRole, PostDevelopers } from "../controllers/users.controllers";
import { ProfilePicUpload, Signin, Signup } from "../controllers/User.Controller";
import { protect } from "../middleware/checkauth";

export const router = express.Router();

router.post('/developers', protect, PostDevelopers)

router.get('/developers', protect, GetDevelopers)
// edit developer 
router.put('/developers/:id', protect, EditDeveloper)
router.delete('/developers/delete/:id', protect, DeleteDeveloper)
router.get('/developers/filter/:role', protect, GetDevelopersbyRole)


router.post('/developers/upload/img/:id', protect, ProfilePicUpload)


router.post('/signin', Signin)
router.post('/signup', Signup)

