import jwt from "jsonwebtoken";
import "dotenv/config";

export const genToken = (payload, key) => {
    try {
        const token = jwt.sign(payload, key);
        return token;
    } catch (error) {
        console.error(error.message);
    }
};



export const verifyToken = (token, secretkey ) => {
    const decoded = jwt.verify(token, secretkey);
    return decoded;
}



