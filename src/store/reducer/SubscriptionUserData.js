import { createSlice } from '@reduxjs/toolkit'

export const slicesubscriptionUserData = createSlice({
    name: 'subscriptionUserData',
    initialState: {
        data: {}
    },
    reducers: {
        fetched: (state, { payload }) => {
            state.data = payload.data;
        }
    }
})
const { fetched } = slicesubscriptionUserData.actions

export const SetSubscriptionUserData = (data) => async (dispatch) => {
    if (!data) throw Error('missing Data parameter');
    dispatch(fetched({ data }));
}

export default slicesubscriptionUserData.reducer