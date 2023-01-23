import { HIDE_POPUP, SHOW_POPUP } from "../actions/ActionTypes";

// const initialState = {
//   modal: { modalType: "", showModal: false },
// };

// const popupReducer = (state = initialState, action) => {
//   let { type, payload } = action;
//   switch (type) {
//     case SHOW_POPUP:
//       return {
//         ...state,
//         modal: {
//           modalType: payload.modalType,
//           showModal: payload.showModal || true,
//         },
//       };
//     case HIDE_POPUP:
//       return {
//         ...state,
//         modal: {
//           modalType: payload.modalType,
//           showModal: payload.showModal || false,
//         },
//       };
//     default:
//       return state;
//   }
// };


// export default popupReducer;


import { createSlice } from '@reduxjs/toolkit'

export const slicepopupReducer = createSlice({
  name: 'popupReducer',
  initialState: {
    modal: { modalType: "", showModal: false },
  },
  reducers: {
    fetched: (state, { payload }) => {
      state.modal = payload.data;
    }
  }
})

// Action creators are generated for each case reducer function
const { fetched } = slicepopupReducer.actions

export const SetpopupReducerData = (data) => async (dispatch) => {
  if (!data) throw Error('missing Data parameter');
  console.log('Buy reduce', data);
  dispatch(fetched({ data }));
}

export default slicepopupReducer.reducer
