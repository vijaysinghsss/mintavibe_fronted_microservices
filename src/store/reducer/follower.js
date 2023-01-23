import { createSlice } from "@reduxjs/toolkit";

export const sliceFollower = createSlice({
  name: "followers",
  initialState: {
    UserData: {},
  },
  reducers: {
    fetched: (state, { payload }) => {
      state.data = payload.FollowerId;
    },
  },
});

const { fetched } = sliceFollower.actions;

export default sliceFollower.reducer;

export const SetFollowerData = (data) => async (dispatch) => {
  if (!data) throw Error("missing Data parameter");
  dispatch(fetched({ data }));
};
