import { createSlice } from '@reduxjs/toolkit'

export const sliceBuy = createSlice({
    name: 'Buy',
    initialState: {
        data: {
            modal: false,
            checkout: false,
            buyModal: false
        }
    },
    reducers: {
        fetched: (state, { payload }) => {
            state.data = payload.data;
        }
    }
})

// Action creators are generated for each case reducer function
const { fetched } = sliceBuy.actions

export const SetBuyData = (data) => async (dispatch) => {
    if (!data) throw Error('missing Data parameter');
    console.log('Buy reduce', data);
    dispatch(fetched({ data }));
}

export default sliceBuy.reducer