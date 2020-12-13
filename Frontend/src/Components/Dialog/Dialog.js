import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap'
import { dialogActions } from '../../Actions';


function Dialog(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        props.dispatch(dialogActions.clear());
    }
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

    function ErrorTitle() {
        headerProps.title = 'Atenção';
        return 'Atenção';
    }

    function SucessTitle() {
        headerProps.title = 'Sucesso';
        return 'Sucesso';
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
        {...props}
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={false}
        >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" >
                    <h3 >
                        <SegTitle {...headerProps} />
                    </h3>
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <p>
                    {props.dialog.message}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button class="btn btn-danger" onClick={handleClose}>
                    Fechar
              </button>
            </Modal.Footer>
        </Modal>



    )
}

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
