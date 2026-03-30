import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../features/products/productsSlice";

function SingleProductPage() {

    const { id } = useParams();
    const dispatch = useDispatch()

    const product = useSelector(state => state.products.product)

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [])
    
    if(!product) return <h1>Product loading...</h1>

    return (
        <>
            <h1>{product?.name}</h1>
            <h2>{product?.description}</h2>
            <h2>{product?.price}</h2>
            <h2>{product?.stock}</h2>
        </>
    )

}

export default SingleProductPage
