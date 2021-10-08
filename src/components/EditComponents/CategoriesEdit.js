import React from 'react';
import CategoryEdit from './CategoryEdit';
import { CATEGORY } from '../GetComponents/Constants';
const CategoriesEdit = ({ categories, parentElement , parentAction }) => {
    return (
        <div className="category-container">
            {categories.map((category, indexCategory) => {
                
                const element = {
                    name: CATEGORY,
                    index: indexCategory,
                    parent: parentElement,
                    json: category
                }
                return <CategoryEdit
                    category={category}
                    element={element}
                    key={"category" + indexCategory}
                    cantElements={categories.length}
                    parentAction={parentAction}
                />
            })
            }
        </div>
    );
};

export default CategoriesEdit;