import bcrypt from "bcrypt";

function hashPassword(password: any): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
}

export default hashPassword;
