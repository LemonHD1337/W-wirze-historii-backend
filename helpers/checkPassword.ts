import bcrypt from "bcrypt";

function checkPassword(inputPassword: string, dbPassword: string) {
    return new Promise((resolve, reject) => {
        const isPasswordCorrect = bcrypt.compareSync(inputPassword, dbPassword);
        if (isPasswordCorrect) {
            resolve("zalogowany");
        } else {
            reject("złe hasło lub email");
        }
    });
}

export default checkPassword