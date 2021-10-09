import React, {  useState } from 'react';
import { connect } from 'react-redux';
import ButtonAlert from './ButtonAlert';
const ButtonSaveAll = ({ state }) => {

    const [alertSave, setAlertSave] = useState(false);
    const [successSave, setSuccessSave] = useState(false);
    const [errorSave, setErrorSave] = useState(false);

    const saveAll = () => {

        fetch('/data', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(state) // body data type must match "Content-Type" header
        })
            .then(function (res) { return res.json(); })
            .then(function (data) { setSuccessSave(true) })
            .catch(function (error) { setErrorSave(true) });
    };

    return (
        <>
            {successSave && setTimeout(() => setSuccessSave(false), 3000) && false}
            {errorSave   && setTimeout(() =>   setErrorSave(false), 3000) && false}

            {successSave &&
                <span className="btn-alert-text">SE HAN GUARDADO SATISFACTORIAMENTE LOS DATOS</span>
            }
            {errorSave &&
                <span className="btn-alert-text" >HUBO UN ERROR AL GUARDAR LOS DATOS</span>
            }
            {!alertSave &&
                <span className="btn-save-all btn-not-pressed" onClick={() => setAlertSave(true)}>
                    GUARDAR
                </span>}
            {alertSave &&
                <ButtonAlert className={"btn-alert-save"} message={"¿Desea subir los cambios?"} action={saveAll} hide={() => setAlertSave(false)} />
            }
        </>
    );
};

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonSaveAll);