import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'Sliders',
    initialState: {
        CuratedNft: [],
        TrendingNft: [],
        serachNft: ""
    },
    reducers: {
        fetched: (state, { payload }) => {
            state[payload.key] = payload.data;
        }
    }
})

// Action creators are generated for each case reducer function
const { fetched } = slice.actions

export const SetSliderData = (data, key) => async (dispatch) => {
    if (!data) throw Error('missing Data parameter');
    if (!key) throw Error('missing Key parameter');


    dispatch(fetched({ data, key }));
}

export default slice.reducer