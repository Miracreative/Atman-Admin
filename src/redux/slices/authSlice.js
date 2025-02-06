import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    auth: false
};
export const authSlice = createSlice({
    name: 'autentification',
    initialState,
    reducers: {
        isLogIn(state, action) {
            state.auth = action.payload;
        }
    },
});
export const { isLogIn } = authSlice.actions;
export default authSlice.reducer;
