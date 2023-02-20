
import React, { useState } from 'react'
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import "./navbar.css"
import icon from "../images/icon.png"
import { BsCurrencyDollar } from "react-icons/bs"
import { BsChevronDown, BsChevronUp, BsCart2 } from "react-icons/bs"
import { Link, useResolvedPath, useMatch } from "react-router-dom"
import { useNavigate } from 'react-router-dom';


const All = gql`

query getAll {
  categories {
    name


  }
  currencies {
    label 
    symbol
  }
}
`
const GET_PRODUCT_CATEGORY = gql`
query Category ($input: CategoryInput) {
  category(input: $input){
    products {
      name
      id
      gallery
    }
  }
}


`



const Navbar = ({
  navbutton,
  activebtn
}) => {
  console.log(navbutton)
  const navigate = useNavigate()
  const [currencyselected, setCurrencySelected] = useState("")
  const [isdivActive, setIsDivActiv] = useState(false)
  // const [category, setCategory] = useState("");


  const { data } = useQuery(All)
  // const { data, loading, error, refetch } = useQuery(GET_PRODUCT_CATEGORY ,{
  //   variables: {
  //     input: {
  //       title: category
  //     }
  //   },
  // });

  // const [refetch, {
  //   data: productData, error: productError, loading
  // }] = useLazyQuery(GET_PRODUCT_CATEGORY, {
  //   variables: {
  //     input: {
  //       title: category
  //     }
  //   },
  // })




  // const handleClick = (newCategory) => {
  //   setCategory(newCategory);
  //   refetch({
  //     input: newCategory
  //   });
  //   console.log("sdfsf")
  // };


  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (productError) {
  //   return <div>Error: {productError.message}</div>;
  // }



  const handlecurrency = (e, symbol) => {
    e.preventDefault()
    setCurrencySelected(symbol)
    console.log(symbol)
  }

  function handleline () {
    if(activebtn) {
      return "btn-line"
    } else if (!activebtn) {
      return "btn-line-none"
    }
  }


  return (
    <div>


      <div className='navbar--div'>
        <div className='navbar-category'>
          

              {navbutton}
              
              {/* {data &&
                data.categories.map((category) => {
                  console.log(category.name)

                  return (
                    <button
                      className='categoryname'
                      onClick={() => handleClick(category.name)}>{category.name}</button>

                  )
                })
              } */}
            

         
        </div>
       



        <img src={icon} alt="" className='icon-img'></img>
        <div className='currency-div'
          onClick={(e) => {
            setIsDivActiv(!isdivActive)
          }}

        >
          <div >
            {currencyselected ? currencyselected : <BsCurrencyDollar />}
          </div>
          <div >
            {!isdivActive ?
              <BsChevronDown className='BsChevronDown' /> :
              <BsChevronUp className='BsChevronUp ' />
            }
          </div>
        </div>
        {isdivActive && (
          <div className='currency--list'>
            {
              data.currencies.map(({ label, symbol }) => (
                <div className='currency-option'
                  onClick={(e) => handlecurrency(e, symbol)}
                >
                  <div className='currency-symbol-div' >{symbol} {label}</div>
                  {/* <div className='currency-label-div'>{label}</div> */}
                </div>
              ))
            }

          </div>
        )}
        <div className='cart-icon-div'>
          <BsCart2 />
        </div>




      </div>



      <div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default Navbar