import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './features/studentsSlice';
import classesReducer from './features/classesSlice';
import sectionsReducer from './features/sectionsSlice';

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    classes: classesReducer,
    sections: sectionsReducer,
  },
});