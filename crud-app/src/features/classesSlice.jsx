import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchClasses = createAsyncThunk('classes/fetchClasses', async () => {
  const response = await axios.get('https://6797a15dc2c861de0c6d751d.mockapi.io/api/v1/Class');
  return response.data;
});

export const addClass = createAsyncThunk('classes/addClass', async (newClass) => {
  const response = await axios.post('https://6797a15dc2c861de0c6d751d.mockapi.io/api/v1/Class', newClass);
  return response.data;
});

export const deleteClass = createAsyncThunk('classes/deleteClass', async (id) => {
  await axios.delete(`https://6797a15dc2c861de0c6d751d.mockapi.io/api/v1/Class/${id}`);
  return id;
});

const classesSlice = createSlice({
  name: 'classes',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.data = state.data.filter((cls) => cls.id !== action.payload);
      });
  },
});

export default classesSlice.reducer;