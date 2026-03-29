const { mongoose } = require('mongoose');
const db = require('../database/user');
const admin = require('../firebaseAdmin');
const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        console.log(email, password);
        const result = await db.usertable.findOne({
            email: email,
            password: password
        });
        console.log('result', result);
        if (result) {
            res.status(200).json({
                message: "login successfully!",
                data: result
            });
        } else {
            res.status(404).json({
                message: "Invalid credentials",
            });
        }
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
}

const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!idToken) {
            return res.status(400).json({ message: "ID token is required" });
        }

        // Verify Firebase Token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;

        // Check MongoDB for the user
        let user = await db.usertable.findOne({ email });

        if (!user) {
            // Split name nicely if available
            const nameParts = (name || "Unknown").split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ');

            user = new db.usertable({
                id: uid,
                firstName: firstName,
                lastName: lastName || "User",
                email: email,
                password: "", // SSO users don't need a password for traditional login
                role: "user"
            });
            await user.save();
        }

        return res.status(200).json({
            message: "Google login successful",
            data: user
        });

    } catch (err) {
        console.error("Firebase auth error:", err);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

module.exports = { login, googleLogin };
