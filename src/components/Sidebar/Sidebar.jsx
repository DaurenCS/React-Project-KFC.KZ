import React, { useState } from "react";


function Sidebar() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
      };

    return(
        <>
        <div className="category-filter">
        <label htmlFor="category">Choose a category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
        
        
        </>
    )
}

export default Sidebar