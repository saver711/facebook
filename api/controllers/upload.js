const cloudinary = require("cloudinary")
const fs = require("fs")
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})
exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body
    let files = Object.values(req.files).flat()
    let images = []
    for (const file of files) {
      const url = await uploadToCloudinary(file, path)
      images.push(url)
      removeTmp(file.tempFilePath)
    }
    res.json(images)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

exports.listImages = async (req, res) => {
  const { path, sort, max } = req.body

  cloudinary.v2.search
    .expression(`${path}`)
    .sort_by("created_at", `${sort}`)
    .max_results(max)
    .execute()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err.error.message)
    })
}

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    // cloudinary.v2.uploader.upload(
    //   file,
    //   {
    //     resource_type: "video",
    //     public_id: file.tempFilePath,
    //     chunk_size: 6000000,
    //     eager: [
    //       { width: 300, height: 300, crop: "pad", audio_codec: "none" },
    //       {
    //         width: 160,
    //         height: 100,
    //         crop: "crop",
    //         gravity: "south",
    //         audio_codec: "none",
    //       },
    //     ],
    //     eager_async: true,
    //     // eager_notification_url: "https://mysite.example.com/notify_endpoint",
    //   },
    //   (err, res) => {
    //     if (err) {
    //       removeTmp(file.tempFilePath)
    //       return res.status(400).json({ message: "Upload image failed." })
    //     }
    //     resolve({
    //       url: res.secure_url,
    //     })
    //   }
    // )
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath)
          return res.status(400).json({ message: "Upload image failed." })
        }
        resolve({
          url: res.secure_url,
        })
      }
    )
  })
}

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err
  })
}


