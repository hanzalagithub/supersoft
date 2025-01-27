import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSections = createAsyncThunk('sections/fetchSections', async () => {
  const response = await axios.get('https://6797a15dc2c861de0c6d751d.mockapi.io/api/v1/Section');
  return response.data;
});

export const upSection = createAsyncThunk('sections/addSection', async (newSection) => {
  const response = await axios.post('https://6797a15dc2c861de0c6d751d.mockapi.io/api/v1/Section', newSection);
  return response.data;
});

export const deleteSection = createAsyncThunk('sections/deleteSection', async (id) => {
  await axios.delete(`https://6797a15dc2c861de0c6d751d.mockapi.io/api/v1/Section/${id}`);
  return id;
});

const sectionsSlice = createSlice({
  name: 'sections',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addSection.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.data = state.data.filter((section) => section.id !== action.payload);
      });
  },
});

export default sectionsSlice.reducer;
