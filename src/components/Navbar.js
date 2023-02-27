
import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import "./navbar.css"
import icon from "../images/icon.png"
import { BsCurrencyDollar } from "react-icons/bs"
import { BsChevronDown, BsChevronUp, BsCart2 } from "react-icons/bs"
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
  currencies,
  currencyselected,
  setCurrencySelected

}) => {

  
  const navigate = useNavigate()
  // const [currencyselected, setCurrencySelected] = useState("")
  const [isdivActive, setIsDivActiv] = useState(false)
  
  
  const {data} = useQuery(All)
  

  return (
    <div>


      <div className='navbar--div'>
        <div className='navbar-category'>
          {navbutton}
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
          {currencies}
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