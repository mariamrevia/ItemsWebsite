import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./main.css"




const Main = ({

}) => {


    const location = useLocation()
    const {handleDatas,newCategorys } = location.state 
    console.log (handleDatas )
   
    
    return (
        <div className='product--sectiion'>
            <h2 className='categoryName'>{newCategorys}</h2>

            <>
                {handleDatas && (

                    <div className='product'>

                        {handleDatas.map((product, index) => {
                            console.log(product.prices[0].amount)
                            console.log(product.prices[0].currency.label)

                            return (
                                <div className='product-div-'>

                                    <img className='product-img' src={product.gallery}></img>
                                    <div className='product-info-div'
                                        key={product.id}
                                    >
                                        <h2 className='product-name-hd'>{product.name}</h2>
                                        <div
                                            className='price-div'
                                            key={index}>
                                            <p className='curr-symb'>{product.prices[0].currency.symbol}</p>
                                            <p className='curr-amount'>{product.prices[0].amount}</p>

                                        </div>


                                    </div>


                                </div>
                            )
                        })}

                    </div>
                )}
            </>





        </div>
    )
}

export default Main