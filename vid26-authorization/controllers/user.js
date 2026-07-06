import User from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../service/auth.js";

const handleSignup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name, !email, !password) {
        return res.status(400).json({ error: 'All fields are required!' });
    }
    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/');
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email, !password) {
        return res.status(400).json({ error: 'All fields are required!' });
    }
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render('login', {
            error: 'Invalid username or password'
        });
    }
    const token = setUser(user);
    res.cookie('token', token);
    return res.redirect('/');
}

export { handleSignup, handleLogin };