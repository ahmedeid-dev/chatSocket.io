import User from './../../../database/model/user.model.js';
import asyncHandler from "express-async-handler"
import bcrypt from 'bcrypt'

export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find()
    users.map(user => user.password = undefined)
    res.status(200).json({ 'message': 'All users', users })
})

export const getOneUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const user = await User.findOne({ _id: id })
    if (!user) return res.status(400).json({ message: 'User not found' })

    user.password = undefined
    res.status(200).json({ 'message': 'User', user })
})

export const addUser = asyncHandler(async (req, res, next) => {
    const { name, phone, password } = req.body
    if (!name || !phone, password) res.status(400).json({ message: 'All fields are required' })

    const phoneExist = await User.findOne({ phone })
    if (phoneExist) return res.status(400).json({ message: 'Phone already exist' })
    password = bcrypt.hashSync(password, 10)
    const user = new User({ name, phone, password })
    await user.save()
    user.password = undefined
    res.status(201).json({ message: 'User created successfully', user })
})

export const updateUser = asyncHandler(async (req, res, next) => {
    const { newName, newPhone } = req.body
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'id is required' })

    const phoneExist = await User.findOne({ phone: newPhone })
    if (phoneExist) return res.status(400).json({ message: 'Phone already exist' })

    const user = await User.findOne({ _id: id })
    if (!user) return res.status(404).json({ message: 'User not found' })

    if (newName) user.name = newName
    if (newPhone) user.phone = newPhone

    await user.save()
    user.password = undefined
    res.status(200).json({ message: 'User updated successfully', user })
})

export const changePassword = asyncHandler(async (req, res, next) => {
    const { phone, oldPassword, newPassword } = req.body
    const { id } = req.params
    if (!phone || !oldPassword || !newPassword || !id) return res.status(400).json({ message: 'All fields are required' })

    const user = await User.findOne({ phone, _id: id })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = bcrypt.compareSync(oldPassword, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' })

    user.password = bcrypt.hashSync(newPassword, 10)
    await user.save()
    user.password = undefined
    res.status(200).json({ message: 'Password updated successfully', user })
})

export const deleteUser = asyncHandler(async (req, res, next) => {
    const { phone } = req.body
    const { id } = req.params
    if (!id || !phone) return res.status(400).json({ message: 'All fields are required' })

    const user = await User.findOneAndDelete({ _id: id, phone })
    if (!user) return res.status(400).json({ message: 'User not found' })

    res.status(200).json({ message: 'User deleted successfully' })
})