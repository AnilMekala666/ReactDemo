import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const currentDate = dayjs();
const initialMonthId = currentDate.month() + 1; // Day.js month is 0-based, so add 1
const initialYear = currentDate.year();
const kpiSlice = createSlice({
  name: 'user',
  initialState: {
    selectedDate:{},
    showTable:false,
    payloadDate:{monthId:initialMonthId,year:initialYear}
  },
  reducers: {
    updateSelectedDate:(state,action)=>{
      state.selectedDate=action.payload;
    },
    updateShowTable:(state,action)=>{
      state.showTable=action.payload
    },
    updatePayloadDate:(state,action)=>{
      state.payloadDate=action.payload
    }
  }
});

export const { updateSelectedDate ,updateShowTable,updatePayloadDate} = kpiSlice.actions;

export default kpiSlice.reducer;
