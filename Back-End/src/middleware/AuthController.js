import jwt from 'jsonwebtoken';
import functionary from "../models/functionary.js";
import bcrypt from "bcrypt";

export const signin = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        // Remove o prefixo "Basic " e decodifica as credenciais
        const base64Credentials = authHeader.split(" ")[1];
        const credentials = atob(base64Credentials).split(":");
        const [email, password] = credentials;

        if (credentials.length !== 2) {
            throw new Error("Invalid credentials format");
        }

        // Validação opcional
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const user = await functionary.findOne({login: email}, {password: 1, _id: 0, assignment: 1});

        if (!user) {
            return res.status(401).json({error: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({error: 'Invalid Access'});
        }

        const token = await jwt.sign(
            {user: JSON.stringify({email: email, access: user.assignment})},
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: process.env.JWT_EXPIRES}
        );

        res.cookie("authToken", token, {
            maxAge: 3600000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({login: true, message: "Login realizado com sucesso"});
        // Continue com a lógica de autenticação...

    } catch (error) {
        return res.status(400).json({ error: "Invalid authorization header" });
    }
}

export const getAccessLevel = async (req, res) => {
    const user = req.headers.user
    if (user) {
        return res.status(200).json({valid: true, user: user})
    }
    return res.status(401).json({error: "Unauthorized", valid: false});
}
