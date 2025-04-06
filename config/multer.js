const multer = require('multer');
const path = require('path');


// Set up storage engine
const storage = multer.memoryStorage();

// Multer upload instance
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB

}); 
 
module.exports = upload;