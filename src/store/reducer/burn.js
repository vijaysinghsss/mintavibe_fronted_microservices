import { createSlice } from '@reduxjs/toolkit'

export const sliceBurn = createSlice({
    name: 'burn',
    initialState: {
        data: {
            Burnfunc: () => { },
            modal: false,
        }
    },
    reducers: {
        fetched: (state, { payload }) => {
            state.data = payload.data;
        }
    }
})

// Action creators are generated for each case reducer function
const { fetched } = sliceBurn.actions

export default sliceBurn.reducer

export const SetBurnData = (data) => async (dispatch) => {
    if (!data) throw Error('missing Data parameter');
    dispatch(fetched({ data }));
}
