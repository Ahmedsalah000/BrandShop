import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct, getProductLike } from '../../redux/actions/productsAction';
import mobile from '../../images/mobile.png'
import { getOneCategory } from '../../redux/actions/categoryAction';
import { getOneBrand } from '../../redux/actions/brandAction';
import { createSelector } from '@reduxjs/toolkit';

// Memoized selectors with transformation logic
const selectOneProduct = createSelector(
    state => state.allproducts?.oneProduct,
    oneProduct => oneProduct ? { ...oneProduct } : {}
);

const selectOneCategory = createSelector(
    state => state.allCategory?.oneCategory,
    oneCategory => oneCategory ? { ...oneCategory } : {}
);

const selectOneBrand = createSelector(
    state => state.allBrand?.oneBrand,
    oneBrand => oneBrand ? { ...oneBrand } : {}
);

const selectProductLike = createSelector(
    state => state.allproducts?.productLike,
    productLike => productLike ? { ...productLike } : {}
);

// Alternative approach if you want more specific transformations:
// const selectOneProduct = state => state.allproducts?.oneProduct || {};
// const selectOneCategory = state => state.allCategory?.oneCategory || {};
// const selectOneBrand = state => state.allBrand?.oneBrand || {};
// const selectProductLike = state => state.allproducts?.productLike || {};

const ViewProductsDetalisHook = (prodID) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (prodID) {
            dispatch(getOneProduct(prodID))
        }
    }, [prodID])

    const oneProducts = useSelector(selectOneProduct)
    const oneCategory = useSelector(selectOneCategory)
    const oneBrand = useSelector(selectOneBrand)
    const productLike = useSelector(selectProductLike)

    //to show products item
    let item = oneProducts?.data || [];

    useEffect(() => {
        // Only fetch category and brand data if valid IDs exist and are not empty
        if (item?.category && typeof item.category === 'string' && item.category.trim() !== '') {
            dispatch(getOneCategory(item.category))
            // Fetch similar products in the same category
            dispatch(getProductLike(item.category))
        }
        if (item?.brand && typeof item.brand === 'string' && item.brand.trim() !== '') {
            dispatch(getOneBrand(item.brand))
        }
    }, [item])

    //to view images gallery
    let images = item?.images ? item.images.map((img) => ({ original: img })) : [{ original: mobile }];

    //to show category item
    let cat = oneCategory?.data || [];

    //to show brand item
    let brand = oneBrand?.data || [];

    let prod = productLike?.data || [];

    return [item, images, cat, brand, prod]
}

export default ViewProductsDetalisHook