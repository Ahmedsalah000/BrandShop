import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../../redux/actions/ordersAction';
import { createSelector } from 'reselect';

// Memoized selector
const selectOrderState = state => state.orderReducer;
const selectAllOrders = createSelector(
    [selectOrderState],
    orderState => orderState?.getAllOrders || []
);

const UserGetAllOrderHook = () => {
    const [loading, setLoading] = useState(true);
    const [results, setResult] = useState(0);
    const [paginate, setPaginate] = useState({});
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('user'))
    let userName = ''
    if (user != null)
        userName = user.name

    const get = async () => {
        setLoading(true)
        await dispatch(getAllOrders('', 5))
        setLoading(false)
    }

    useEffect(() => {
        get()
    }, [])

    const onPress = async (page) => {
        setLoading(true)
        await dispatch(getAllOrders(page, 5))
        setLoading(false)
    }

    // Use memoized selector
    const resAllOrder = useSelector(selectAllOrders)
    
    useEffect(() => {
        if (loading === false && resAllOrder) {
            if (resAllOrder.results !== undefined)
                setResult(resAllOrder.results)
            if (resAllOrder.paginationResult)
                setPaginate(resAllOrder.paginationResult)
            if (resAllOrder.data)
                setOrderData(resAllOrder.data)
        }
    }, [loading, resAllOrder])

    return [userName, results, paginate, orderData, onPress]
}

export default UserGetAllOrderHook