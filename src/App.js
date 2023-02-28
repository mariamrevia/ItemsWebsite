import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Tech from "./components/tech"
import Product from './Product';
import { Routes, Route } from "react-router-dom"
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { currencyAction } from './store/currency';
import Main from './Main';
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
      prices {
        amount
        currency {
          label
          symbol
        }
       
      }
    }
  }
}


`


function App() {
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("")
  const [currencyselected, setCurrencySelected] = useState("")

  const { data } = useQuery(All)


  const dispatch = useDispatch()

  const [refetch, {
    data: productData, error: productError, loading
  }] = useLazyQuery(GET_PRODUCT_CATEGORY, {
    variables: {
      input: {
        title: category
      }
    },
  })




  const navigate = useNavigate()

  const handlecurrency = ( symbol, i ) => {

    dispatch(currencyAction.changeIndex(
      i,
    
    ))
    console.log(i)
    // const index = i
    // setIndex(index)
    // e.preventDefault()
    setCurrencySelected(symbol)
  }




  const handleClick = (newCategory) => {
    setCategory(newCategory);
    setCategoryName(newCategory)
    refetch({
      input: newCategory
    }).then(res =>

      navigate("/Main", {
        state: {
          handleDatas: res.data.category.products,
          newCategorys: newCategory,

        }
      })
    )
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  if (productError) {
    return <div>Error: {productError.message}</div>;
  }




  return (
    <div className="App">
      <Navbar
        navbutton={
          data &&
          data.categories.map((category) => {

            // console.log(category.name)
            return (
              <div className='btn-div'>
                <button to="/Main"
                  onClick={() => handleClick(category.name)}
                  className='categoryname'
                >{category.name}</button>

              </div>
            )
          })}
        currencies=
        {data && data.currencies.map(({ label, symbol }, index) => {
          console.log(data.currencies)
          return (

            <div
              key={index}
              className='currency-option'
              onClick={(e) => handlecurrency( symbol, index)}

            >
              <div className='currency-symbol-div' >{symbol} {label}</div>

            </div>
          )
        }


        )
        }
        currencyselected={currencyselected}
        setCurrencySelected={setCurrencySelected}
      />

      <Routes>
        <Route path='/Main' element={<Main/>} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/product/:id" element={<Product />} />

      </Routes>



    </div>
  );
}


export default App;
