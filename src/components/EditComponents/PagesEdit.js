import React from 'react';
import PageEdit from './PageEdit';
import { PAGE } from '../GetComponents/Constants';

const PagesEdit = ({ pages, parentElement , parentAction }) => {

    return (
        <div className="pages-container">
            {pages.map((page, indexPage) => {

                const element = {
                    name: PAGE,
                    index: indexPage,
                    parent: parentElement,
                    json: page
                };

                return <PageEdit
                    page={page}
                    element={element}
                    //show={indexPage === actualPage}
                    key={'page' + indexPage}
                    parentAction={parentAction}
                    cantElements={pages.length}
                />
            }
            )}
        </div>
    );
};

export default PagesEdit;