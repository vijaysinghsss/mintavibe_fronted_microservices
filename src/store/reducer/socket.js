import { createSlice } from '@reduxjs/toolkit'

export const sliceSocket = createSlice({
    name: 'socket',
    initialState: {
        socket: false,
        id: Math.floor(Math.random() * 99999999999999) + new Date().getTime()
    },
    reducers: {
        fetched: (state, { payload }) => {
            state.socket = payload.data;
        }
    }
})

// Action creators are generated for each case reducer function
const { fetched } = sliceSocket.actions

export default sliceSocket.reducer

export const SetSocketData = (data) => async (dispatch) => {
    if (!data) throw Error('missing Data parameter');
    dispatch(fetched({ data }));
}
