import React from 'react'

const Categories = ({children}) => (
  <div className="categories">
    <h3 className="categories__title">Mi Lista</h3>
    {children}
  </div>
);

export default Categories;