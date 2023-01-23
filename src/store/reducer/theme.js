import { createSlice } from '@reduxjs/toolkit'

export const slicetheme = createSlice({
    name: 'theme',
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
const { fetched } = slicetheme.actions

export const SetthemeData = (data) => async (dispatch) => {
    
    dispatch(fetched({ data }));
}

export default slicetheme.reducer