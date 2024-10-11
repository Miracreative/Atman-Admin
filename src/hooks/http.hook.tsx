
import axios from 'axios';

const SERVER_URL:string = 'http://192.168.0.153:5000/api';


interface Admin {
    name: string,
    email: string,
    role: string,
    password: string,
}

interface Knowlege {
    title: string,
    content: string,
    file: any
}

const getAllAdmins = async () =>  {
    try {
        const response = await axios.get(`${SERVER_URL}/users`);
        return response.data;
    } catch (error: any) {
        return error.response.data
    } 
}

const createAdmin = async (admin: Admin) => {
   
    try {
        const response = await axios.post(`${SERVER_URL}/auth/registration`, {
            data: {
                admin
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response.data
    }
}

const deleteAdmin = async (id:number) =>  {
    try {
        const response = await axios.delete(`${SERVER_URL}/users`, {
            data: {
                id
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getOneAdmin = async (id: any) => {
    try {
        const response = await axios.get(`${SERVER_URL}/users/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const editAdmin = async (admin: Admin) =>  {
    try {
        const response = await axios.put(`${SERVER_URL}/users`, {
            data: {
                admin
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getAllKnowlege = async (page: any) =>  {
    try {
        const response = await axios.get(`${SERVER_URL}/base-admin/${page}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getOneKnowlege = async (id: any) => {
    try {
        const response = await axios.get(`${SERVER_URL}/base/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getSearchKnowlege = async (searchText: any) => {
    try {
      
        const response = await axios.get(`${SERVER_URL}/base-search/${searchText}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}


const deleteKnowlege = async (id: number) =>  {
    try {
        const response = await axios.delete(`${SERVER_URL}/base`, {
            data: {
                id
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getAllGoods = async () =>  {
    try {
        const response = await axios.get(`${SERVER_URL}/goods`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getAllSertifications = async (page: any) =>  {
    try {
        const response = await axios.get(`${SERVER_URL}/sertificate/${page}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getSearchSertifications = async (searchText: any) => {
    try {
      
        const response = await axios.get(`${SERVER_URL}/sertificate-search/${searchText}`);
        console.log(response)
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

export { 
    getAllGoods, 
    createAdmin, 
    getAllAdmins,
    editAdmin,
    getOneAdmin,
    deleteAdmin,
    deleteKnowlege,
    getOneKnowlege,
    getSearchKnowlege,
    getAllKnowlege,
    getAllSertifications,
    getSearchSertifications
};
