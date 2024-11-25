import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isCDAdataCleared: false,
    isRCMdataCleared:false,
    loader:false,
    userAuthToken:"",
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
    updateUserAuthToken: (state,action)=>{
      state.userAuthToken = action.payload;
    }
  }
});

export const { setIsCDAdataCleared,setIsRCMdataCleared,setLoader,updateUserAuthToken } = userSlice.actions;

export default userSlice.reducer;
