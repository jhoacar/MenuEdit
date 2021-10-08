import React from 'react';

import { BsCloudUpload } from 'react-icons/bs';
import { connect } from 'react-redux';
import { ACTIONS_PRODUCT } from '../ReducersComponents/ProductReducer';
import ImageEdit from './ImageEdit';

const ImagesEdit = function ({ parentElement, addImage }) {

    const hasImageProduct = parentElement?.json?.images && parentElement.json.images.length > 0;
    const srcImages = parentElement?.json?.images;

    const uploadImage = (event) => {
        const inputFile = event.target;
        const file = inputFile.files[0];
        addImage(parentElement, file.name)
        const formData = new FormData();
        formData.append("image", file);

        fetch("/loadImage", {
            method: 'POST',
            body: formData
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className="btn-config-container">
                <input type="file" name="uploadfile" id={"img"+parentElement.index} style={{ display: "none" }} onChange={uploadImage} />
                <label className="btn-config btn-not-pressed" htmlFor={"img"+parentElement.index}>
                    <BsCloudUpload />
                </label>
                <span className="add-text">Añadir Imagen</span>
            </div>
            {hasImageProduct &&
                srcImages.map((srcImage, index) => {
                    return <ImageEdit
                        srcImage={srcImage}
                        indexImage={index}
                        parentElement={parentElement}
                        cantElements={srcImages.length}
                        key={"image" + index}
                    />
                })
            }
        </div>
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    addImage(element, src) {
        dispatch({
            type: ACTIONS_PRODUCT.ADD_IMAGE,
            payload: {
                element: element,
                src: src
            }
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagesEdit);