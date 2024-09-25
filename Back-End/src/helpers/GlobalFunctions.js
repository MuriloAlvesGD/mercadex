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