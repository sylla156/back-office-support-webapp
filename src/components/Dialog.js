import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Col, ButtonGroup, Modal} from '@themesberg/react-bootstrap';
import AxiosWebHelper from "../utils/axios-helper";


export const FormDialog = (props) => {


    const [open, setOpen] = useState(false);

    const [, setIsLoaded] = useState(false);

    const [inputDialogEmail, setInputDialogEmail] = useState('');


    const [inputDialogApiKey, setInputDialogApiKey] = useState('');

    const [, setIntouchForce] = useState({});
    const {buttonForce: {id}} = props;

    console.log("Transaction Id depuis HUB2 vers Intouch " + id);

    console.log("input email : " + inputDialogEmail);
    console.log("input api key : " + inputDialogApiKey);

    const axios = AxiosWebHelper.getAxios();

    const handleClickOpen = () => {

        setOpen(true);

    };

    const handleClose = () => {

        setOpen(false);

    };
    const baseUrlUrlInTouch = "https://support-api.hub2.io/transfers/" + id + "/force-status";

    const headers = {
        headers: {
            "ApiKey": inputDialogApiKey,
            "Login": inputDialogEmail,
        }
    };
    const handlesSendOrderForceStatus = () => {

        axios.post(
            baseUrlUrlInTouch,
            headers,
            {
                "status": "failed"
            },
        )
            .then((result) => {

                setIntouchForce(result.data);
                setIsLoaded(true);
                console.log(result);

            },
            (error) => {

                setIsLoaded(true);
                console.log(error.message);

            }

            )

    };

    return (
        <div>

            <div className="btn-toolbar" onClick={handleClickOpen}>
                <Col md={6} className="mb-3">
                    <ButtonGroup>
                        <Button variant="containedSecondary" color="secondary" size="lg">Force Status</Button>
                    </ButtonGroup>
                </Col>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Force</DialogTitle>
                <DialogContent>
                    <DialogContentText>
            Attention vous vous apprêtez à forcer le statut du transfert, si vous continuez le processus, le transfert aura son statut changé.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={event => setInputDialogEmail(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ApiKEY"
                        label="ApiKey"
                        type="text"
                        fullWidth
                        onChange={event => setInputDialogApiKey(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default" variant="contained">
            Cancel
                    </Button>
                    <Button onClick={handlesSendOrderForceStatus} color="secondary" variant="containedSecondary">
            Force
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}


export const FormDialogRefreshStatus = (props) => {


    // const [open, setOpen] = useState(false);

    // const [error, setError] = useState(null);
    const [, setIsLoaded] = useState(false);

    const [, setIntouchRefresh] = useState({});

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const formTransfer = props["formTransfer"];

    const axios = AxiosWebHelper.getAxios();

    const handleSendOrderRefreshStatus = (props) => {

        const receipeIdRefreshStatusPending = formTransfer.map((item) => item.id);
        console.log("type of newTest : " + typeof (receipeIdRefreshStatusPending))
        console.log("newTest : \n" + receipeIdRefreshStatusPending);

        for (let i = 0; i < receipeIdRefreshStatusPending.length; i++) {

            const receipeLoopRefreshStatus = receipeIdRefreshStatusPending[i];
            console.log("loopTest value [id]" + i + " : \n" + receipeLoopRefreshStatus);

            const baseUrlIntouchRefreshStatus = "https://support-api.hub2.io/transfers/" + receipeLoopRefreshStatus + "/refresh-status"
            console.log("baseUrlIntouchRefreshStatus :\n" + baseUrlIntouchRefreshStatus);

            const headers = {
                headers: {
                    "ApiKey": "bD8Yryye98rKpzfBq5jqtfDrRfd5JwP4YGPEbwZTsGMaV3bwD7",
                    "Environment": "live",
                }
            };

            axios.post(
                baseUrlIntouchRefreshStatus,
                headers,
            )
                .then((result) => {

                    setIntouchRefresh(result.data);
                    setIsLoaded(true);
                    console.log(result);
                    // if (result) { }

                },
                (error) => {

                    setIsLoaded(true);
                    console.log(error.message);

                }

                )

        }

    };
    return (
        <>
            <div className="btn-toolbar">
                <Col md={6} className="mb-3">
                    <br />
                    <ButtonGroup>
                        <Button variant="containedSecondary" color="secondary" size="lg" onClick={handleShow}>Refresh Status</Button>
                    </ButtonGroup>
                </Col>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Refresh Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
          Attention, vous vous apprêtez à refresh les statuts des transferts
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color="primary" onClick={handleClose}>
            Fermer
                    </Button>
                    <Button variant="containedSecondary" color="secondary" onClick={handleSendOrderRefreshStatus} >Refresh</Button>
                </Modal.Footer>
            </Modal>
        </>
    );


}


