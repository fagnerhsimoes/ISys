import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap'
import ContentHeader from '../../Commons/Form/ContentHeader';


function Dialog(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        if (props.dialog.message)
            handleShow();
        else
            handleClose();
    }, [props.dialog.message]);


    const headerProps = {
        title: 'Atenção',
    }

    function ErrorTitle(props) {
        headerProps.title = 'Erro';
        return '';
    }

    function SucessTitle(props) {
        headerProps.title = 'Sucesso';
        return '';
    }

    function SegTitle() {
        if (props.dialog.type === "dialog-danger") {
            return <ErrorTitle />;
        } else {
            return <SucessTitle />;
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >

            <Modal.Header closeButton id="contained-modal-title-vcenter">
                Atenção
            </Modal.Header>
            
            <Modal.Body>
                {props.dialog.message}
            </Modal.Body>
            <Modal.Footer>
                <button class="btn btn-primary" onClick={handleClose}>
                    Fechar
              </button>
            </Modal.Footer>
        </Modal>



    )
}
//}

Dialog.propTypes = {
    limpar: PropTypes.func.isRequired,
    dialog: PropTypes.object.dialog,
};

function mapStateToProps(state) {
    const { dialog } = state;
    return {
        dialog
    };
}

const connectedApp = connect(mapStateToProps)(Dialog);
export { connectedApp as Dialog }; 
