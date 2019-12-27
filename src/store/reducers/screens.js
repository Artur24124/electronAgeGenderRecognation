import { handleActions } from 'redux-actions';
import * as screensActions from '../actions/screens';

const initState = {
  screens: [],
  loading: false,
  error: null
};

export const Screens = handleActions(
    {
        [screensActions.createScreen]: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        [screensActions.createScreenSuccess]: (state, action) => {
            return {
                ...state,
                screens: action.payload,
                loading: false
            }
        },
        [screensActions.createScreenError]: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        },
        [screensActions.getAllScreens]: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        [screensActions.getAllScreensSuccess]: (state, action) => {
            return {
                ...state,
                screens: action.payload,
                loading: false
            }
        },
        [screensActions.getAllScreensError]: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        },
    },
    initState
);