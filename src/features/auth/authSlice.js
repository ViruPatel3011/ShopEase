import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showToaster } from '../../utils/Toaster';
import { ToasterType } from '../../app/constant';
import axiosInstance from '../../helpers/axiosInstance';


const initialState = {
    loggedInUserToken: null, // This should only contain user identity ==> 'id'/'role'
    status: 'idle',
    error: null

};

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/auth/signup", userData);
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

export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async () => {
        return { data: 'success' };

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
                state.loggedInUserToken = action.payload.data;
                showToaster(ToasterType.Success, action.payload.message);

            })
            .addCase(checkUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = action.payload.data;
                showToaster(ToasterType.Success, action.payload.message);

            })
            .addCase(checkUserAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload.message;
            })
            .addCase(signOutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signOutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = null;
                showToaster(ToasterType.Success, 'SignOut successfully');
            })

    },
});

export const selectLoggedInUserToken = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;

export const { increment } = authSlice.actions;

export default authSlice.reducer;
