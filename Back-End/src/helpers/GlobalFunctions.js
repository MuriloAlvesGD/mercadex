import Functionary from "../models/functionary.js";

export async function getEnterpriseId(req) {
    const email = atob(JSON.parse(req.headers.user));
    const enterpriseOfUser = await Functionary.findOne({login: email}, {enterprise_id: 1, _id: 0});
    if (!enterpriseOfUser) {
        throw new Error('enterprise/user not Found');
    }
    return enterpriseOfUser.enterprise_id;
}

export function verifyPassword(password){
    return [password.length >= 8,
        /[a-z]/.test(password),
        /[A-Z]/.test(password),
        /\d/.test(password),
        /[@$!%*?&_-]/.test(password),
    ].includes(false);
}

export function isEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function isBase64(str) {
    const base64Regex = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{2}==)?$/i;
    return base64Regex.test(str);
}