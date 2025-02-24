
import { CREATE_NEW_USER, RESET_PASSWORD, UPDATE_USER_PROFILE, VERIFY_PASSWORD, FOREGT_PASSWORD, GET_CURERNT_USER, LOGIN_USER, UPDATE_USER_PASSWORD } from '../type'

import { useInsertData } from '../../hooks/useInsertData'
import { useGetData, useGetDataToken } from './../../hooks/useGetData';
import { useInsUpdateData } from '../../hooks/useUpdateData';

//create new user 
export const createNewUser = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/signup`, data);
        dispatch({
            type: CREATE_NEW_USER,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: CREATE_NEW_USER,
            payload: e.response,
        })
    }
}
//login user 
export const loginUser = (data) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_USER,
            payload: { loading: true, error: null }
        });

        const response = await useInsertData('/api/v1/auth/login', data);
        
        if (response?.data?.token) {
            // Store token first
            localStorage.setItem('token', response.data.token);
            
            try {
                // Get user data
                await dispatch(getLoggedUser());
                
                dispatch({
                    type: LOGIN_USER,
                    payload: { 
                        data: response.data, 
                        loading: false, 
                        error: null 
                    }
                });
            } catch (userError) {
                // If getting user data fails, clear token and show error
                localStorage.removeItem('token');
                dispatch({
                    type: LOGIN_USER,
                    payload: { 
                        error: userError.message || 'Failed to fetch user data after login', 
                        loading: false,
                        data: null
                    }
                });
            }
        } else {
            dispatch({
                type: LOGIN_USER,
                payload: { 
                    error: 'Invalid login response: Missing authentication token', 
                    loading: false,
                    data: null
                }
            });
        }
    } catch (e) {
        localStorage.removeItem('token');
        dispatch({
            type: LOGIN_USER,
            payload: { 
                error: e.response?.data?.message || 'Authentication failed. Please check your credentials.',
                loading: false,
                data: null
            }
        });
    }
}
//login  user 
export const getLoggedUser = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/users/getMe`);
        dispatch({
            type: GET_CURERNT_USER,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_CURERNT_USER,
            payload: e.response,
        })
    }
}


//1-foregt  passwrod 
export const forgetPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/forgotPasswords`, data);
        dispatch({
            type: FOREGT_PASSWORD,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: FOREGT_PASSWORD,
            payload: e.response,
        })
    }
}


//2-verify  passwrod 
export const verifyPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/verifyResetCode`, data);
        dispatch({
            type: VERIFY_PASSWORD,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: VERIFY_PASSWORD,
            payload: e.response,
        })
    }
}


//2-reset  passwrod 
export const resetPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/v1/auth/resetPassword`, data);
        dispatch({
            type: RESET_PASSWORD,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: RESET_PASSWORD,
            payload: e.response,
        })
    }
}



//update  user data 
export const updateUserProfileData = (body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/v1/users/updateMe`, body);
        console.log(response)
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: e.response,
        })
    }
}


//update  user password
export const updateUserPassword = (body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/v1/users/changeMyPassword`, body);
        console.log(response)
        dispatch({
            type: UPDATE_USER_PASSWORD,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: UPDATE_USER_PASSWORD,
            payload: e.response,
        })
    }
}
