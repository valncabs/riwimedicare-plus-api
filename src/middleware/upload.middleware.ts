import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (extension !== ".txt") {
        return cb(new Error("Solo se permiten archivos .txt"));
    }

    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter
});