import multer from "multer";
import path from 'path';
const uploadPath = path.join(process.cwd(), "./uploads")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
})
    
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//         cb(null, true);
//     } else {
//         cb(new Error("Only PDF files are allowed"), false);
//     }
// };

export const upload = multer({
    storage
});
