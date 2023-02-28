
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./product.css"
import { useSelector } from 'react-redux'
// import styled from 'styled-components'





const Product = () => {
    const location = useLocation()
    const { productData } = location.state

    console.log(productData)
    console.log(productData.attributes
    )


    const currencyIndex = useSelector((state) => state.currency.index)
    const [mainImg, setMainImg] = useState(productData.gallery[0])
    console.log(mainImg)


    return (
        <div className='specific-product-div'>

            <section className='img-section'>


                <div className='img-grid-1'>
                    {
                        productData.gallery.map((img, index) => {
                            return (
                                <figure>
                                    <img
                                        onClick={() => setMainImg(img)}
                                        key={index}
                                        className='img-box'
                                        src={img} alt=""></img>
                                </figure>
                            )
                        })

                    }


                </div>
                <div>

                    <img
                        className='main-img'
                        src={mainImg}></img>
                </div>
            </section>
            <section>
                <div className='product-desciption'>
                    <h2>{productData.name}</h2>
                    <div className='size-div'>

                        {productData.attributes.map((attribute) => {
                            console.log(attribute.id)

                            if (attribute.id == "Color") {
                                return (
                                    <div
                                        className='properties-div'>
                                        <h2>{attribute.name}:</h2>
                                        <div className='values-div'>
                                            {attribute.items.map((item) => {
                                                return (
                                                    <button
                                                        className='item-color-btn'
                                                        id={item.id}
                                                        style={{ backgroundColor: item.value }}>

                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            } else if (attribute.id) {
                                return (
                                    <div
                                        className='properties-div'>
                                        <h2>{attribute.name}:</h2>
                                        <div className='values-div'>
                                            {attribute.items.map((item) => {
                                                return (
                                                    <button
                                                    className='size-div-button'
                                                        id={item.id}
                                                    >
                                                        {item.value}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                )

                            }

                        })}




                    </div>
                    {productData.prices.map((price, index) => {

                        if (currencyIndex === index) {
                            return (
                                <div>
                                    <h2>{price.__typename}:</h2>
                                    <div className='product-price-div'>

                                        <p>{price.currency.symbol}</p>
                                        <p>{price.amount}</p>
                                    </div>
                                </div>
                            )
                        }
                    })}
                    <p></p>
                    <button className='addCart-btn'>Add to Cart</button>
                    <p>{productData.description}</p>

                </div>

            </section>
        </div>
    )

}
export default Product