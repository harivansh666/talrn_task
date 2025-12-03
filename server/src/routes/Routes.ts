import express from "express";
import { GetDevelopers, PostDevelopers } from "../controllers/users.controllers";

export const router = express.Router();

router.post('/developers', PostDevelopers)

router.get('/developers', GetDevelopers)
