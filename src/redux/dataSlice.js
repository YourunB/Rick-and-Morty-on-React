import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  maxPage: 42,
  charactersArr: null,
  load: false,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {

    updateSaveCharacters: (state, action) => {
      if (state.charactersArr === null) state.charactersArr = action.payload;
      if (state.charactersArr !== null) {
        const arrId = [];
        state.charactersArr.forEach(element => {
          arrId.push(element.id)
        });
        action.payload.forEach(element => {
          if (arrId.indexOf(element.id) === -1) {
            state.charactersArr.push(element);
          }
        });
      }
    },

    updatePage: (state, action) => {
      state.page = action.payload;
    },

    updateLoad: (state, action) => {
      state.load = action.payload;
    },

  },
});

export const { updateSaveCharacters, updatePage, updateLoad } = dataSlice.actions;

export default dataSlice.reducer;
