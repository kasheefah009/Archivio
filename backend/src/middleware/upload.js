
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "uploads/avatars",
    filename: (req, file, cb) =>
        cb(null, `${req.userId}-${Date.now()}${path.extname(file.originalname)}`)
});

export const upload = multer({ storage });