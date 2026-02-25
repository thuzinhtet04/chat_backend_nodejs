
import { type Request, Router } from "express";
import {
  login,
  logout,
  signup,
  uploadProfilePic,
} from "../controllers/auth.controller";
import multer from "multer";
// 2. Configure Multer (handles the file in memory)
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/sign-up", signup);
router.post("/sign-in", login);
router.put("/update-profile-pic", upload.single("image"), uploadProfilePic);
router.post("/logout", logout);
export default router;
