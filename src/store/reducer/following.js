import { createSlice } from "@reduxjs/toolkit";

export const sliceFollowing = createSlice({
  name: "followings",
  initialState: {
    UserData: {},
  },
  reducers: {
    fetched: (state, { payload }) => {
      state.data = payload.data;
    },
  },
});

const { fetched } = sliceFollowing.actions;

export default sliceFollowing.reducer;

export const SetFollowingData = (data) => async (dispatch) => {
  if (!data) throw Error("missing Data parameter");
  dispatch(fetched({ data }));
};
