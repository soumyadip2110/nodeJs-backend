import User from "../models/user.js";

const handleGetAllUsers = async (req, res) => {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
}

const handleGetUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ msg: 'No user found' });
    }
    return res.status(200).json(user);
}

const handleCreateUser = async (req, res) => {
    const body = req.body;
    if (!body || !body.firstName || !body.email || !body.jobTitle || !body.gender) {
        res.status(400).json({ msg: 'First name, email, job title and gender are required fields!' });
    }
    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName || '',
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle
    });
    console.log('Result: ', result);
    res.status(201).json({ msg: 'User created', userId: result._id });
}

const handleEditUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, { lastName: 'Changed' });
    return res.json({ msg: 'success' });
}

const handleDeleteUser = async (req, res) => {
    const result = await User.findByIdAndDelete(req.params.id);
    console.log(result);
    res.json({ msg: 'deleted!' });
}

export { handleGetAllUsers, handleGetUserById, handleCreateUser, handleEditUser, handleDeleteUser };