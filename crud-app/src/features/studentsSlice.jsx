import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get('https://6797a15dc2c861de0c6d751d.mockapi.io/api/v1/Student');
  return response.data;
});

export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
  const response = await axios.post('https://6797a15dc2c861de0c6d751d.mockapi.io/api/v1/Student', student);
  return response.data;
});

export const updateStudent = createAsyncThunk('students/updateStudent', async (student) => {
  const response = await axios.put(`https://6797a15dc2c861de0c6d751d.mockapi.io/api/v1/Student/${student.id}`, student);
  return response.data;
});

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
  await axios.delete(`https://6797a15dc2c861de0c6d751d.mockapi.io/api/v1/Student/${id}`);
  return id;
});

const studentsSlice = createSlice({
  name: 'Student',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.data.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.data = state.data.filter((s) => s.id !== action.payload);
      });
  },
});

export default studentsSlice.reducer;