import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GrAddCircle } from 'react-icons/gr';
import { BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi';
import ButtonAlert from './ButtonAlert';

const ButtonConfigComponent = ({ actionElement, indexElement , actionComponent, messageAlert, cantElements }) => {

    const [alertDelete, setAlertDelete] = useState(false);

    return (
        <>
            {actionComponent &&
                <div className="btn-config-container ">
                    {actionComponent?.addItem &&
                        <span
                            onClick={()=>actionComponent.addItem(actionElement, indexElement)}
                            className={"btn-config btn-not-pressed"}
                        >
                            <GrAddCircle />
                        </span>}
                    {
                        cantElements > 1 &&
                        <>
                            {actionComponent?.moveUpItem &&
                                <span
                                    className={"btn-config btn-not-pressed"}
                                    onClick={()=>actionComponent.moveUpItem(actionElement, indexElement)}
                                >
                                    <BiUpArrowAlt />
                                </span>
                            }
                            {actionComponent?.moveDownItem &&
                                <span
                                    className={"btn-config btn-not-pressed"}
                                    onClick={()=>actionComponent.moveDownItem(actionElement, indexElement)}
                                >
                                    <BiDownArrowAlt />
                                </span>
                            }
                        </>
                    }
                    {actionComponent?.deleteItem && cantElements > 0 &&
                        <span
                            onClick={(e) => { setAlertDelete(true); }}
                            className={"btn-config btn-not-pressed"}
                        >
                            <AiFillDelete />
                        </span>
                    }
                    {alertDelete && actionComponent?.deleteItem &&
                        <ButtonAlert message={messageAlert} action={()=>actionComponent.deleteItem(actionElement, indexElement)} hide={() => { setAlertDelete(false) }} />
                    }

                </div>

            }
        </>
    );
};

export default ButtonConfigComponent;