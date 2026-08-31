import multer from "multer";

/**
 * Multer storage configuration using memory storage.
 *
 * - Files are stored in memory as Buffer objects.
 * - Useful for processing files directly (ej. parsear JSON) sin necesidad de guardarlos en disco.
 */
const storage = multer.memoryStorage();

/**
 * Multer upload middleware.
 *
 * - Only allows files with MIME type "application/json".
 * - Rejects any other file type with an error.
 *
 * @example
 * app.post("/upload", upload.single("file"), (req, res) => {
 *   const jsonBuffer = req.file?.buffer;
 *   const jsonData = JSON.parse(jsonBuffer.toString());
 *   res.json(jsonData);
 * });
 */
export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/json") {
            cb(null, true);
        } else {
            cb(new Error("Only JSON files are allowed"));
        }
    }
});
