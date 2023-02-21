import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Tech from "./components/tech"
import { Routes, Route, Navigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import { useResolvedPath, useMatch } from "react-router-dom"
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

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
  

  const { data } = useQuery(All)

  const [handleData, setData] = useState([])

  const [refetch, {
    data: productData, error: productError, loading
  }] = useLazyQuery(GET_PRODUCT_CATEGORY, {
    variables: {
      input: {
        title: category
      }
    },
  })




const navigate = useNavigate ()

  const handleClick = (newCategory) => {
  
   
    setCategory(newCategory);
    setCategoryName(newCategory)
    
    refetch({
      input: newCategory
    }).then (res => 
      
      navigate("/Main",{
        state: {
          handleDatas:res.data.category.products,
          newCategorys:newCategory

        }
      })
      
      
      
      )

    console.log("sdfsf")



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
            console.log(category.name)
            return (
              <div className='btn-div'>
                <button to="/Main"
                  onClick={() => handleClick(category.name)}
                  className='categoryname'
                >{category.name}</button>

              </div>
            )
          })} />







      <Routes>
        <Route path='/Main' element={
          <Main/>} />
        <Route to="/tech" element={<Tech />} />

      </Routes>



    </div>
  );
}

// function CustomLink({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to)
//   const isAqtivePath = useMatch({ path: resolvedPath.pathname, end: true })
//   return (

//     <Link to={to} {...props}>
//       {children}
//     </Link>

//   )
// }

export default App;
