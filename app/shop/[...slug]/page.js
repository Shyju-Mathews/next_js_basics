import React from 'react'

const Shop = ({ params }) => {
    const slug = params.slug;
  return (
    <div>
      <h1>Welcome to our shop : {params.slug}</h1>
      {/* <p>our produsts : {params.slug[0]} & {params.slug[1]}</p> */}
      {slug.length > 1 && (
        <p>Our products: {slug[0]} & {slug[1]}</p>
      )}
    </div>
  )
}

export default Shop
