import { createSlice } from "@reduxjs/toolkit";

export const sliceActivity = createSlice({
  name: "activity",
  initialState: {
    data: {},
  },
  reducers: {
    fetched: (state, { payload }) => {
      state.data = payload.data;
    },
  },
});

const { fetched } = sliceActivity.actions;

export const SetActivityData = (data) => async (dispatch) => {
  if (!data) throw Error("missing Data parameter");
  dispatch(fetched({ data }));
};
export default sliceActivity.reducer;
