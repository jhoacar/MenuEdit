import React, { useState } from 'react';
import ImageAction from '../ActionComponents/ImageAction';
import ButtonConfigComponent from '../Buttons/ButtonConfigComponent';

const ImageEdit = ({ srcImage, indexImage, cantElements, parentElement }) => {

    const [actionImage, setActionImage] = useState(null)
    const dirImage = "menuView/images/";
    return (
        <div>
            <ImageAction setAction={setActionImage} />
            <ButtonConfigComponent
                actionElement={ parentElement }
                indexElement={indexImage}
                actionComponent={actionImage}
                cantElements={cantElements}
                messageAlert={"¿Desea eliminar esta imagen?"}
            />
            <img className="image-product" src={dirImage + srcImage} alt={"Esta imagen "+dirImage + srcImage+" no se encuentra, eliminala"} />
        </div>
    );
};

export default ImageEdit;