import multer from "multer";
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

export const fieldValidation = {
    image: ["image/jpeg", "image/png", "image/jpg"],
    video: ["video/mp4"],
    files: ["application/pdf", "text/plain"]
};

export const upload = ({
    customPath = "general",
    validation = [],
    size = 5
} = {}) => {

    const BASE_UPLOAD_PATH = resolve("./uploads"); 

    const storage = multer.diskStorage({

        destination: function (req, file, cb) {
            const filePath = resolve(BASE_UPLOAD_PATH, customPath);

            if (!existsSync(filePath)) {
                mkdirSync(filePath, { recursive: true });
            }

            cb(null, filePath);
        },

            filename: function (req, file, cb) {
            const uniqueFileName = randomUUID() + "_" + file.originalname;

            const finalPath = `/uploads/general/${uniqueFileName}`;

            file.finalPath = finalPath;  
            req.file = file;              

            cb(null, uniqueFileName);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (validation.length === 0 || validation.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid File Format ❌"));
        }
    };

    const limits = { fileSize: size * 1024 * 1024 };

    return multer({ storage, fileFilter, limits });
};