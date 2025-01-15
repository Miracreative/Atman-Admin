import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    auth: false,
    user: {

    }
}

export const authSlice = createSlice({
    name: 'autentification',
    initialState,
    reducers: {
        isLogIn(state, action) {
            state.auth = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload
        }
    },
})

export const { isLogIn, setUser } = authSlice.actions;

export default authSlice.reducer;