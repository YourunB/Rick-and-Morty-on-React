import { createSlice } from '@reduxjs/toolkit';

const initialState={
  page: 1,
  maxPage: 42,
  charactersArr: null,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {

    updateSaveCharacters: (state, action) => {
      state.charactersArr = action.payload;
      console.log(action.payload);
    },

  },
});

export const { updateSaveCharacters } = dataSlice.actions;

export default dataSlice.reducer;
