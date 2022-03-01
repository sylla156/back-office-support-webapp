import {Col, Form, InputGroup, Button} from '@themesberg/react-bootstrap';
import moment from 'moment-timezone'
import Datetime from 'react-datetime';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarAlt, faDollarSign, faLessThanEqual} from '@fortawesome/free-solid-svg-icons'

import React, {useState} from "react";

export default function TransferListSearch() {

    const [dateStart, setDateStart] = useState(undefined);
    // const [dateEnd, setDateEnd] = useState(undefined);

    const handleDateChange = (event, setMethod) => {

        const value = event.target.value
        setMethod(value)
    
    }
    return (
        <div className="align-items-center d-flex flex-wrap">
            <Col xs={12} md={3} lg={3} className="mb-2 px-2">
                <Form.Group id="search">
                    <Form.Label>Marchand</Form.Label>
                    <Form.Control type="text" placeholder="marchand" />
                </Form.Group>
            </Col>
            <Col xs={12} md={5} className="mb-2 px-2">
                <Form.Group id="amountMin">
                    <Form.Label>Montant</Form.Label>
                    <InputGroup>
                        <InputGroup.Text><FontAwesomeIcon icon={faDollarSign} /></InputGroup.Text>
                        <Form.Control type="number" placeholder="Minimum" />
                        <InputGroup.Text><FontAwesomeIcon icon={faLessThanEqual} /></InputGroup.Text>
                        <Form.Control type="number" placeholder="Maximum" />
                    </InputGroup>
                </Form.Group>
            </Col>
            <Col xs={12} md={3} lg={3} className="mb-2 px-2">
                <Form.Group id="status">
                    <Form.Label>Statut</Form.Label>
                    <Form.Control type="text" placeholder="status" />
                </Form.Group>
            </Col>
            <Col xs={12} md={2} lg={2} className="mb-2 px-2">
                <Form.Group id="dateStart">
                    <Form.Label>Date début</Form.Label>
                    <Datetime
                        timeFormat={false}
                        onChange={setDateStart}
                        renderInput={(props, openCalendar) => (
                            <InputGroup>
                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    value={dateStart ? moment(dateStart).format('DD/MM/YYYY') : ''}
                                    placeholder="dd/mm/yyyy"
                                    onFocus={openCalendar}

                                    onChange={event => {

                                        handleDateChange(event, setDateStart) 

                                    }}
                                />
                            </InputGroup>
                        )}
                    />
                </Form.Group>
            </Col>
            <Col xs={12} md={3} lg={3} className="mb-2 px-2">
                <Form.Group id="agent">
                    <Form.Label>Type d'operation</Form.Label>
                    <Form.Select >
                        <option >Type d'operation</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col xs={12} md={3} lg={3} className="mb-2 px-2">
                <Form.Group id="search">
                    <Form.Label>Réference</Form.Label>
                    <Form.Control type="text" placeholder="Réference" />
                </Form.Group>
            </Col>
            <Col xs={12} md={3} lg={3} className="px-2">
                <div className="mt-2">
                    <Button variant="outline-primary" type="button" >Effacer</Button>
                    <Button className="ml-3" variant="primary" type="button">Filtrer</Button>
                </div>
            </Col>
        </div>
    )

}
