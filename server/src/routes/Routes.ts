import express from "express";
import { DeleteDeveloper, EditDeveloper, GetDevelopers, PostDevelopers } from "../controllers/users.controllers";
import { Signin, Signup } from "../controllers/User.Controller";
import { protect } from "../middleware/checkauth";

export const router = express.Router();

router.post('/developers', protect, PostDevelopers)

router.get('/developers', protect, GetDevelopers)
// edit developer 
router.put('/developers/:id', protect, EditDeveloper)
router.delete('/developers/:id', protect, DeleteDeveloper)

router.post('/signin', Signin)
router.post('/signup', Signup)

