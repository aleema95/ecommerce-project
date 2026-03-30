import React from "react";
import style from "./ProductCard.module.css"

function ProductCard({name, description, price, stock}) {

    return (
        <>
            <div className={style.container}>
                <h1 className={style.itemName}>{name}</h1>
                <p>{description}</p>
                <h2>${price}</h2>
                <div className={style.stockContainer}>
                    <h2>Cantidad</h2>
                    <h2 className={style.itemStock}>{stock}</h2>
                </div>
            </div>
        </>
    )
}

export default ProductCard