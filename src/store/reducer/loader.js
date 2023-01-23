import { createSlice } from '@reduxjs/toolkit'

export const sliceloader = createSlice({
    name: 'loader',
    initialState: {
        data: false
    },
    reducers: {
        fetched: (state, { payload }) => {
            state.data = payload.data;
        }
    }
})

// Action creators are generated for each case reducer function
const { fetched } = sliceloader.actions

export const SetloaderData = (data) => async (dispatch) => {
    if (!data) throw Error('missing Data parameter');
    console.log('Buy reduce', data);
    dispatch(fetched({ data }));
}

export default sliceloader.reducer