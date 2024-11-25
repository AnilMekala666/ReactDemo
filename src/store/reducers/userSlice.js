import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isCDAdataCleared: false,
    isRCMdataCleared:false,
    loader:false,
  },
  reducers: {
    setIsCDAdataCleared: (state, action) => {
      state.isCDAdataCleared = action.payload;
    },
    setIsRCMdataCleared:(state,action) =>{
        state.isRCMdataCleared = action.payload;
    },
    setLoader: (state,action) =>{
        state.loader = action.payload;
    },
  }
});

export const { setIsCDAdataCleared,setIsRCMdataCleared,setLoader } = userSlice.actions;

export default userSlice.reducer;
