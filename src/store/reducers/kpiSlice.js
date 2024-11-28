import { createSlice } from '@reduxjs/toolkit';

const kpiSlice = createSlice({
  name: 'user',
  initialState: {
    selectedDate:{}
  },
  reducers: {
    updateSelectedDate:(state,action)=>{
      state.selectedDate=action.payload;
    }
  }
});

export const { updateSelectedDate } = kpiSlice.actions;

export default kpiSlice.reducer;
