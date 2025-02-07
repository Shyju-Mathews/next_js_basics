import React from 'react'

const page = ({ params }) => {
  return (
    <div>
      <h1>welcome {params.slug}</h1>
    </div>
  )
}

export default page
