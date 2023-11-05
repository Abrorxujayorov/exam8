import bcrypt from "bcrypt";

export const passwordHash = (pass, salt) => {
    return bcrypt.hashSync(pass, salt);
}

