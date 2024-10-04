
import axios from 'axios';

const SERVER_URL:string = 'http://192.168.0.153:5000/api';

const getAllAdmins = async () =>  {
    try {
        const response = await axios.get(`${SERVER_URL}/auth/users`);
        return response.data;
    } catch (error) {
        console.log(error);
    } 
}

interface Admin {
    name: string,
    email: string,
    role: string,
    password: string,
}

const createAdmin = async (admin: Admin) => {
   
    try {
        const response = await axios.post(`${SERVER_URL}/auth/registration`, {
            data: {
                admin
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteAdmin = async (id:number) =>  {
    try {
        const response = await axios.delete(`${SERVER_URL}/auth/delete`, {
            data: {
                id
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    } 
}

const getAllGoods = async () =>  {
    try {
        const response = await axios.get(`${SERVER_URL}/goods`);
        return response.data;
    } catch (error) {
        console.log(error);
    } 
}


export { 
    getAllGoods, 
    createAdmin, 
    getAllAdmins,
    deleteAdmin
};
