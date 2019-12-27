import { createActions } from 'redux-actions';

export const {
    createScreen,
    createScreenSuccess,
    createScreenError,
    getAllScreens,
    getAllScreensSuccess,
    getAllScreensError
} = createActions(
    'CREATE_SCREEN',
    'CREATE_SCREEN_SUCCESS',
    'CREATE_SCREEN_ERROR',
    'GET_ALL_SCREENS',
    'GET_ALL_SCREENS_SUCCESS',
    'GET_ALL_SCREENS_ERROR'
);