import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, updateUser, signOut } from './authAPI';
import { showToaster } from '../../utils/Toaster';
import { ToasterType } from '../../app/constant';
import axiosInstance from '../../helpers/axiosInstance';
const initialState = {
    loggedInUser: null,
    status: 'idle',
    error: null

};

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData) => {
        const response = await createUser(userData);
        return response.data;
    }
);

export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async (loginInfo, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/auth/login", loginInfo);
            if (response.data.success) {
                return response.data;
            } else {
                return thunkAPI.rejectWithValue(await response.data);
            }
        } catch (error) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error.response.data);
            } else {
                return thunkAPI.rejectWithValue({ message: error.message });
            }
        }
    }
);

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (updateInfo) => {
        const response = await updateUser(updateInfo);
        return response.data;
    }
);
export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async (updateInfo) => {
        const response = await signOut(updateInfo);
        return response.data;
    }
);


export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = action.payload.data;
                showToaster(ToasterType.Success, 'User created successfully');

            })
            .addCase(checkUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log("ActionPayload", action.payload.data)
                state.loggedInUser = action.payload.data;
                showToaster(ToasterType.Success, action.payload.message);

            })
            .addCase(checkUserAsync.rejected, (state, action) => {
                state.status = 'idle';
                console.log("Action:", action.payload.message)
                state.error = action.payload.message;
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = action.payload;
            })
            .addCase(signOutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signOutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = null;
                showToaster(ToasterType.Success, 'SignOut successfully');

            })

    },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export const { increment } = authSlice.actions;


export default authSlice.reducer;
