import React, { useState, useEffect } from 'react';
import ImageAction from '../ActionComponents/ImageAction';
import ButtonConfigComponent from '../Buttons/ButtonConfigComponent';
import { getDefaultImage } from '../GetComponents/Getters';
import { getImage } from '../GetComponents/StorageIndexedDB';
import { AiOutlineLoading } from 'react-icons/ai';

const ImageEdit = ({ srcImage, indexImage, cantElements, parentElement }) => {

    const [actionImage, setActionImage] = useState(null)
    const [srcImageLoaded, setSrcImageLoaded] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const dirImage = "/images/"+srcImage

    useEffect(() => {

        getDefaultImage()
            .then(response => setSrcImageLoaded(response))
            .catch(error => console.log(error));

        getImage(dirImage)
            .then(response => {
                setImageLoaded(true);
                setSrcImageLoaded(response);
            }
            ).catch(error => {
                setImageLoaded(true);
                console.log(error);
            })
    }, [dirImage, setSrcImageLoaded])

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
            {!imageLoaded &&
                <div className="image-product" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <AiOutlineLoading className="rotating" />
                </div>
            }
            {imageLoaded && srcImage &&
                <img
                    className={"image-product"}
                    alt=""
                    src={srcImageLoaded}
                />
            }
        </div>
    );
};

export default ImageEdit;