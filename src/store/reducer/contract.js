import { createSlice } from '@reduxjs/toolkit'

export const sliceContract = createSlice({
    name: 'contract',
    initialState: {
        data: {}
    },
    reducers: {
        fetched: (state, { payload }) => {
            state.data = payload.data;
        }
    }
})

// Action creators are generated for each case reducer function
const { fetched } = sliceContract.actions

export default sliceContract.reducer

export const SetContractData = (data) => async (dispatch) => {
    if (!data) throw Error('missing Data parameter');
    dispatch(fetched({ data }));
}
