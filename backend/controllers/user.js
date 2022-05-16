const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation")
const User = require("../models/User")
const Post = require("../models/Post")
const Code = require("../models/Code")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cloudinary = require("cloudinary")
const { generateToken } = require("../helpers/tokens")

const {
  sendVerificationEmail,
  sendVerificationCode,
} = require("../helpers/mailer")

const generateNumericCode = require("../helpers/generateCode")

// register
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      })
    }

    const check = await User.findOne({ email })
    if (check) {
      return res.status(400).json({
        message: "email address exists, try another one",
      })
    }

    if (!validateLength(first_name, 3, 20)) {
      return res.status(400).json({
        message: "first name must be between 3 and 20 characters",
      })
    }
    if (!validateLength(last_name, 3, 20)) {
      return res.status(400).json({
        message: "last name must be between 3 and 20 characters",
      })
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be atleast 6 characters",
      })
    }
    const cryptedPassword = await bcrypt.hash(password, 12)

    let tempUsername = first_name + last_name
    let newUsername = await validateUsername(tempUsername)

    const user = await new User({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save()

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "24h"
    )

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
    sendVerificationEmail(user.email, user.first_name, url)

    const token = generateToken({ id: user._id.toString() }, "7d")
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
      verified: user.verified,
      message: "User created successfully, please verify your email address",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// activateAccount
exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id

    const { token } = req.body
    const user = jwt.verify(token, process.env.TOKEN_SECRET)
    const check = await User.findById(user.id)

    if (validUser !== user.id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete this action",
      })
    }

    if (check.verified) {
      return res.status(400).json({
        message: "account already verified",
      })
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true })
      return res.status(200).json({
        message: "account verified successfully",
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: "email address does not exist, try another one",
      })
    }
    const check = await bcrypt.compare(password, user.password)
    if (!check) {
      return res.status(400).json({
        message: "invalid password, please try again",
      })
    }
    const token = generateToken({ id: user._id.toString() }, "7d")
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
      verified: user.verified,
      // message: "user logged in successfully, please verify your email address",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// auth

// sendVerification
exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id
    const user = await User.findById(id)

    if (user.verified) {
      return res.status(400).json({
        message: "account already verified",
      })
    }

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "24h"
    )
    //url
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
    //send email
    sendVerificationEmail(user.email, user.first_name, url)
    res.status(200).json({
      message: "verification email sent successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
//findUser
exports.findUser = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email }).select("-password")
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      })
    }
    res.status(200).json({
      picture: user.picture,
      email: user.email,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//sendResetPasswordCode
exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email }).select("-password")
    await Code.findOneAndRemove({ user: user._id })
    const code = generateNumericCode(5)
    const savedCode = await new Code({
      user: user._id,
      code,
    }).save()
    sendVerificationCode(user.email, user.first_name, code)

    return res.status(200).json({
      message: "Code sent successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//validateResetCode
exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body
    const user = await User.findOne({ email })
    const dbCode = await Code.findOne({ user: user._id })
    if (dbCode.code !== code) {
      return res.status(400).json({
        message: "invalid code",
      })
    }
    return res.status(200).json({
      message: "code verified successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// changePassword
exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body

    const cryptedPassword = await bcrypt.hash(password, 12)

    await User.findOneAndUpdate({ email }, { password: cryptedPassword })

    return res.status(200).json({
      message: "password changed successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params
    const profile = await User.findOne({ username }).select("-password")
    if (!profile) {
      return res.json({ ok: false })
    }
    const posts = await Post.find({ user: profile._id })
      .populate("user")
      .sort({ createdAt: -1 })
    res.json({ ...profile.toObject(), posts })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body
    await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    })
    res.json(url)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateCover = async (req, res) => {
  try {
    const { url } = req.body

    await User.findByIdAndUpdate(req.user.id, {
      cover: url,
    })
    res.json(url)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateDetails = async (req, res) => {
  try {
    const { infos } = req.body
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        details: infos,
      },
      {
        new: true,
      }
    )
    res.json(updated.details)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
