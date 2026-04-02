import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../features/products/productsSlice";
import style from "./SingleProductPage.module.css"

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
        <div className={style.mainContainer}>
            <h1 className={style.productName}>{product?.name}</h1>
            <div className={style.imageInfoContainer}>
                <img src={product?.image_url}  />
                <div className={style.infoContainer}>
                    <h2 className={style.productDescription}>{product?.description}</h2>
                    <div className={style.priceStockContainer}>
                        <h2>${product?.price}</h2>
                        <h2>Cantidad: {product?.stock}</h2>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default SingleProductPage
