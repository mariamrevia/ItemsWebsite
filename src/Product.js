
import React from 'react'
import { useLocation } from 'react-router-dom'
import "./product.css"




const Product = () => {
    const location = useLocation()
    const { productData } = location.state

    console.log(productData)
    console.log(productData.attributes
    )



    // const { id } = useParams()
    // const [refetch, {
    //     data: productData, error: productError, loading
    // }] = useLazyQuery(GET_PRODUCT, {
    //     variables: {
    //         productId: {
    //             productId: "apple-iphone-12-pro"
    //         }
    //     },
    // })


    // if (loading) {
    //     return <div>Loading...</div>;
    //   }

    //   if (productError) {
    //     return <div>Error: {productError.message}</div>;
    //   }






    return (
        <div className='specific-product-div'>

            <section>

            </section>
            <section>
                <div className='product-desciption'>
                    <h2>{productData.name}</h2>
                    <div className='size-div'>

                        {productData.attributes.map((attribute) => {
                            return (
                                <div className='properties-div'>
                                    <h2>{attribute.name}:</h2>
                                    <div className='values-div'>
                                        {attribute.items.map((item) => {
                                            return (
                                                <button >{item.displayValue}</button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}




                    </div>
                    {productData.prices.map((price) => {
                        return (
                            <div>
                                <p>{price.amount}</p>
                                <p>{price.currency}</p>
                            </div>
                        )
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