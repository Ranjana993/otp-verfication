const path = require('path')
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, path.join(__dirname, "../public/images"))
    }
  },
  filename: (req, file, callback) => {
    const name = Date.now() + '_' + file.originalname
    callback(null, name)
  }
})

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true)
  }
  else {
    callback(null, false)
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })
module.exports = upload