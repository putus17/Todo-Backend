import { Router } from "express";
import {
  register,
  login,
  getProfile
} from '../controllers/authcontroller'
import { authenticate } from "../middleware/authmiddleware";

const router = Router();

// Auth-related routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate,getProfile)



export default router;
