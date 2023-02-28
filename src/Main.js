import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useQuery, gql, useLazyQuery } from '@apollo/client'
import { currencyAction } from './store/currency';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import "./main.css"
// import { useParams } from 'react-router-dom'

const GET_PRODUCT = gql`
query product($productId: String!) {
    product(id: $productId) {
      id
      name
      inStock
      gallery
      description
      prices {
        currency {
          symbol
          label
        }
        amount
      }
      attributes {
          name
          type
          id
          items {
              displayValue
              id
              value
            }
            
        } 
        description
    
    }
  }

`


const Main = ({


}) => {

    const currencyIndex = useSelector((state) => state.currency.index)
    console.log(currencyIndex)

    // const dispatch = useDispatch ()
    const location = useLocation()
    const { handleDatas, newCategorys } = location.state

    console.log(handleDatas)

    const navigate = useNavigate()


    const [productId, setProductId] = useState()


    const [refetch, {
        data: productData, error: productError, loading
    }] = useLazyQuery(GET_PRODUCT, {
        variables: {
            productId: productId
        }
    })

    if (loading) {
        return <div>Loading...</div>;
    }

    if (productError) {
        return <div>Error: {productError.message}</div>;
    }




    function handleProduct(id) {
        const productId = id
        setProductId(id)


        refetch({
            id: productId
        }).then(res =>

            navigate("/product/" + productId, {
                state: {
                    productData: res.data.product,
                    specialproductId: id
                }
            })
        )

    }

    // const handlecurrency = (indx,index) => {


    //     const filtered = []

    //     for (let i = 0; i < indx.length; i++) {
    //         if (indx[i] === index) {
    //             return indx.filter((indx) => indx)
    //         }
    //         console.log(indx)
    //         if (indx[i]) {
    //             filtered.push(indx[i]);
    //           }
    //         }
    //         console.log(filtered)
    //         return filtered.filter((elem) => elem);
    //     }

    function handleClass() {
        if (currencyIndex) {
            return "price-div-none"
        }

    }



    return (
        <div

            className='product--sectiion'>
            <h2

                className='categoryName'>{newCategorys}</h2>
            <>
                {handleDatas && (



                    <div className='product'>

                        {handleDatas.map((product) => {

                            return (
                                <div
                                    onClick={() => handleProduct(product.id)}
                                    className='product-div-'>
                                    <img
                                        className='product-img' src={product.gallery}></img>
                                    <div className='product-info-div'
                                        key={product.id}
                                    >
                                        <h2
                                            className='product-name-hd'>{product.name}</h2>



                                        {product.prices.map((price, index) => {
                                            console.log(price)
                                            if (currencyIndex === index) {
                                                return (

                                                    <div className='price-div' >
                                                        <p>{price.amount}</p>
                                                        <p>{price.currency.symbol}</p>
                                                    </div>
                                                )


                                            } 
                                        })
                                        }







                                    </div>
                                </div>
                            )
                        })

                        }

                    </div>

                )

                }

            </>





        </div>
    )
}

export default Main