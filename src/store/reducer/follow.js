import { createSlice } from '@reduxjs/toolkit'

export const sliceFollow = createSlice({
    name: 'Follow',
    initialState: {
        data: {
            ipfs: 0,
            approve: 0,
            mint: 0,
            modal: false,
            func: () => { }
        }
    },
    reducers: {
        fetched: (state, { payload }) => {
            console.log('follow reduce payload', payload, state);
            state.data = payload.data;
        }
    }
})

// Action creators are generated for each case reducer function
const { fetched } = sliceFollow.actions

export const SetFollowrData = (data) => async (dispatch) => {
    if (!data) throw Error('missing Data parameter');
    console.log('follow reduce', data);
    dispatch(fetched({ data }));
}

export default sliceFollow.reducer