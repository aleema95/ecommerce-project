import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";

function ProductsPage() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)

    useEffect(() => {
        if(products.length >= 1) return
        dispatch(fetchProducts())
    }, [])

    return (
        <>
            <h1>Products Page</h1>
            {products.map( product => (
                <Link key={product.id}  to={`/product/${product.id}`}>
                    <ProductCard key={product.id}
                                {...product}
                                />
                </Link>
            ))}
        </>
    )
}

export default ProductsPage