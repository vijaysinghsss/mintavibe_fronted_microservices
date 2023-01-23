import { createSlice } from '@reduxjs/toolkit'

export const sliceUser = createSlice({
    name: 'users',
    initialState: {
        data: {},
        xumm: false
    },
    reducers: {
        fetched: (state, { payload }) => {
            state.data = payload.data;
        },
        xumm: (state, { payload }) => {
            state.xumm = payload.data;
        }
    }
})

// Action creators are generated for each case reducer function
const { fetched, xumm } = sliceUser.actions

export default sliceUser.reducer

export const SetUserData = (data) => async (dispatch) => {
    if (!data) throw Error('missing Data parameter');
    dispatch(fetched({ data }));
}

export const SetXummData = (data) => async (dispatch) => {
    dispatch(xumm({ data }));
}
