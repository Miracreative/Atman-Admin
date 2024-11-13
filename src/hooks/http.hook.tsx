
import axios from 'axios';

const SERVER_URL:string = 'http://83.147.246.205:5000/api';


interface Admin {
    name: string,
    email: string,
    role: string,
    password: string,
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
        const response = await axios.delete(`${SERVER_URL}/users/${id}`);
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
        const response = await axios.delete(`${SERVER_URL}/base/${id}`);
   
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
        return console.log(error)
    } 
}

const getSearchSertifications = async (searchText: any) => {
    try {
      
        const response = await axios.get(`${SERVER_URL}/sertificate-search/${searchText}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getOneSertificate = async (id: any) => {
    try {
        const response = await axios.get(`${SERVER_URL}/sertificate-one/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response;
    } 
}

const deleteSertificate = async (id: number) =>  {
    try {
        const response = await axios.delete(`${SERVER_URL}/sertificate/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}


const getAllNews = async (page: any) =>  {
    try {
        const response = await axios.get(`${SERVER_URL}/news-pagination/${page}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getSearchNews = async (searchText: any) => {
    try {
        const response = await axios.get(`${SERVER_URL}/news-search/${searchText}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getOneNews = async (id: any) => {
    try {
        const response = await axios.get(`${SERVER_URL}/news/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response;
    } 
}

const deleteNews = async (id: number) =>  {
    try {
        const response = await axios.delete(`${SERVER_URL}/news/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getAllGoods = async (page: any) =>  {
    try {
        const response = await axios.get(`${SERVER_URL}/goods-pagination/${page}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getSearchGoods = async (searchText: any) => {
    try {
        const response = await axios.get(`${SERVER_URL}/goods-search/${searchText}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getGoodsOnMainParameters = async (main: any) => {
    try {
        const response = await axios.get(`${SERVER_URL}/goods-main/${main}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getOneGood = async (id: any) => {
    try {
        const response = await axios.get(`${SERVER_URL}/goods/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response;
    } 
}

const deleteGood = async (id: number) =>  {
    try {
        const response = await axios.delete(`${SERVER_URL}/goods/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const createFavourite = async (id:number) => {
   
    try {
        const response = await axios.post(`${SERVER_URL}/favourite`, {
            data: {
                good_id: id
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response.data
    }
}

const getAllFavouriteGoods = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/favourite`);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const deleteFavourite = async (id: number) =>  {
    try {
        const response = await axios.delete(`${SERVER_URL}/favourite/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getAllSout = async (page: any) =>  {
    try {
        const response = await axios.get(`${SERVER_URL}/sout-admin/${page}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getOneSout = async (id: any) => {
    try {
        const response = await axios.get(`${SERVER_URL}/sout/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}

const getSearchSout = async (searchText: any) => {
    try {
      
        const response = await axios.get(`${SERVER_URL}/sout-search/${searchText}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}


const deleteSout = async (id: number) =>  {
    try {
        const response = await axios.delete(`${SERVER_URL}/sout/${id}`);
   
        return response.data;
    } catch (error: any) {
        return error.response.data;
    } 
}
export { 
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
    getSearchSertifications,
    getOneSertificate,
    deleteSertificate,
    getAllNews,
    getSearchNews,
    getOneNews,
    deleteNews,
    getAllGoods,
    getSearchGoods,
    getOneGood,
    deleteGood,
    getGoodsOnMainParameters,
    getAllFavouriteGoods,
    createFavourite,
    deleteFavourite,
    deleteSout,
    getOneSout,
    getSearchSout,
    getAllSout,
};
