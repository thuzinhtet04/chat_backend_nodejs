import { Router } from "express";
import multer from "multer";
import { login, signup, logout, updateProfile } from "../controllers/auth.controller";
import { protectedRoute } from "../middleware/auth.middleware";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/sign-up", signup);
router.post("/sign-in", login);
router.post("/logout", logout);
router.put("/update-profile", protectedRoute, upload.single("file"), updateProfile);
export default router;
