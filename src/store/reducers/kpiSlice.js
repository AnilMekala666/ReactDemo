import { createSlice } from '@reduxjs/toolkit';

const kpiSlice = createSlice({
  name: 'user',
  initialState: {
    selectedDate:{},
    showTable:false,
  },
  reducers: {
    updateSelectedDate:(state,action)=>{
      state.selectedDate=action.payload;
    },
    updateShowTable:(state,action)=>{
      state.showTable=action.payload
    }
  }
});

export const { updateSelectedDate ,updateShowTable} = kpiSlice.actions;

export default kpiSlice.reducer;
