
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./product.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { cartActions } from './store/attribute-slice'

// import styled from 'styled-components'






const Product = () => {
    const location = useLocation()
    const { productData } = location.state

    console.log(productData)


    const dispatch = useDispatch();


    const currencyIndex = useSelector((state) => state.currency.index)
    const attribute = useSelector((state) => state.attribute.valueList)
    console.log(attribute)
    // const ValueList = useSelector((state) => state.attribute.valueList)

    // console.log(ValueList)

    const [mainImg, setMainImg] = useState(productData.gallery[0])

    console.log(mainImg)

    const handleClick = (attributeId,value, id, displayValue) => {

        console.log(attribute)
        dispatch(cartActions.chooseAttribute({

            attributeId,
            value,
          
        }




        ));
    }

    const click = () => {
        console.log(productData)
        dispatch(cartActions.addToCart(
            productData




        ))
    }


    function handlebtnClass (vl , id) {
        console.log(vl)
        console.log(attribute[id])
        if(attribute[id] === vl) {
            return "active"
        } else {
            return "size-div-button "
        }
    }

    // function handlebtnClass(vl, id) {
    //     if ( Object.keys(attribute).forEach ((key) => key === id) && 
    //                    Object.values(attribute).forEach((value) => value === vl 
    //     )) {
    //         return "active";
    //     } else {
    //         return "size-div-button";
    //     }
    // }





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

                            if (attribute.id === "Color") {
                                return (
                                    <div
                                        className='properties-div'>
                                        <h2>{attribute.name}:</h2>
                                        <div className='values-div'>
                                            {attribute.items.map((item) => {
                                                return (
                                                    <button
                                                        onClick={() => handleClick(attribute.id,item.value, item.id, item.displayValue)}
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
                                                        onClick={() => handleClick(attribute.id,item.value, item.id, item.displayValue)}
                                                        className={`size-div-button ${handlebtnClass(item.value,attribute.id)}`}
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
                    <button
                        onClick={() => click()}
                        className='addCart-btn'>Add to Cart</button>
                    <p>{productData.description}</p>


                </div>

            </section>
        </div>
    )

}
export default Product