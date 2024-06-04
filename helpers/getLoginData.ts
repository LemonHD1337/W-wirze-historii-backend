import Users from "../models/Users";


interface IDataLogin {
    password: string;
    id: number;
    role: {
        id: number
        role: string
    };
}

async function getLoginData(email: string): Promise<IDataLogin> {
    try {
        return await Users.login(email)
    } catch (err: any) {
        return err
    }
}

export default getLoginData