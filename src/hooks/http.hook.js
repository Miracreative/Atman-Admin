import axios from 'axios';
const SERVER_URL = 'https://api.atman-auto.ru/api';
const getAllAdmins = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/users`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const createAdmin = async (admin) => {
    try {
        const response = await axios.post(`${SERVER_URL}/auth/registration`, {
            data: {
                admin
            }
        });
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const deleteAdmin = async (id) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/users/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getOneAdmin = async (id) => {
    try {
        const response = await axios.get(`${SERVER_URL}/users/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const editAdmin = async (admin) => {
    try {
        const response = await axios.put(`${SERVER_URL}/users`, {
            data: {
                admin
            }
        });
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getAllKnowlege = async (page) => {
    try {
        const response = await axios.get(`${SERVER_URL}/base-admin/${page}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getOneKnowlege = async (id) => {
    try {
        const response = await axios.get(`${SERVER_URL}/base/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getSearchKnowlege = async (searchText) => {
    try {
        const response = await axios.get(`${SERVER_URL}/base-search/${searchText}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const deleteKnowlege = async (id) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/base/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getAllSertifications = async (page) => {
    try {
        const response = await axios.get(`${SERVER_URL}/sertificate/${page}`);
        return response.data;
    }
    catch (error) {
        return console.log(error);
    }
};
const getSearchSertifications = async (searchText) => {
    try {
        const response = await axios.get(`${SERVER_URL}/sertificate-search/${searchText}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getOneSertificate = async (id) => {
    try {
        const response = await axios.get(`${SERVER_URL}/sertificate-one/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response;
    }
};
const deleteSertificate = async (id) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/sertificate/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getAllNews = async (page) => {
    try {
        const response = await axios.get(`${SERVER_URL}/news-pagination/${page}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getSearchNews = async (searchText) => {
    try {
        const response = await axios.get(`${SERVER_URL}/news-search/${searchText}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getOneNews = async (id) => {
    try {
        const response = await axios.get(`${SERVER_URL}/news/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response;
    }
};
const deleteNews = async (id) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/news/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getAllGoods = async (page) => {
    try {
        const response = await axios.get(`${SERVER_URL}/goods-pagination/${page}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getSearchGoods = async (searchText) => {
    try {
        const response = await axios.get(`${SERVER_URL}/goods-search/${searchText}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getGoodsOnMainParameters = async (main) => {
    try {
        const response = await axios.get(`${SERVER_URL}/goods-main/${main}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getOneGood = async (id) => {
    try {
        const response = await axios.get(`${SERVER_URL}/goods/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response;
    }
};
const deleteGood = async (id) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/goods/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const createFavourite = async (id) => {
    try {
        const response = await axios.post(`${SERVER_URL}/favourite`, {
            data: {
                good_id: id
            }
        });
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getAllFavouriteGoods = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/favourite`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const deleteFavourite = async (id) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/favourite/${id}`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getAllSout = async (page) => {
    try {
        const response = await axios.get(`${SERVER_URL}/sout-admin/${page}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getOneSout = async (id) => {
    try {
        const response = await axios.get(`${SERVER_URL}/sout/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getSearchSout = async (searchText) => {
    try {
        const response = await axios.get(`${SERVER_URL}/sout-search/${searchText}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const deleteSout = async (id) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/sout/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getAllPerson = async (page) => {
    try {
        const response = await axios.get(`${SERVER_URL}/person/${page}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getOnePerson = async (id) => {
    try {
        const response = await axios.get(`${SERVER_URL}/person-one/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getSearchPerson = async (searchText) => {
    try {
        const response = await axios.get(`${SERVER_URL}/person-search/${searchText}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const deletePerson = async (id) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/person/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const getCompany = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/company`);
        return response.data[0];
    }
    catch (error) {
        return error.response.data;
    }
};
const auth = async (logName, password) => {
    try {
        const response = await axios.post(`${SERVER_URL}/auth/login`, {
            data: {
                email: logName,
                password
            }
        });
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const reset = async (email) => {
    try {
        const response = await axios.post(`${SERVER_URL}/auth/reset`, {
            data: {
                email
            }
        });
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
const pass = async (token) => {
    try {
        const response = await axios.get(`${SERVER_URL}/auth/password/${token}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};
export { createAdmin, getAllAdmins, editAdmin, getOneAdmin, deleteAdmin, deleteKnowlege, getOneKnowlege, getSearchKnowlege, getAllKnowlege, getAllSertifications, getSearchSertifications, getOneSertificate, deleteSertificate, getAllNews, getSearchNews, getOneNews, deleteNews, getAllGoods, getSearchGoods, getOneGood, deleteGood, getGoodsOnMainParameters, getAllFavouriteGoods, createFavourite, deleteFavourite, deleteSout, getOneSout, getSearchSout, getAllSout, deletePerson, getOnePerson, getSearchPerson, getAllPerson, getCompany, auth, reset, pass };
