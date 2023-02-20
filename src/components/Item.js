import React from 'react'
import { useQuery ,gql } from '@apollo/client'



const item = gql `
query Category($input: CategoryInput) {
  category(input: $input) {
    products {
      id
      name
    }
  }
}


`

const Item = () => {
  const { loading, error, data } = useQuery(item)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const firstCategoryProducts = data.categories[0].products;
  const productCounts = firstCategoryProducts.map(product => product.name);
  return (
    <div>



    </div>
  )
}

export default Item