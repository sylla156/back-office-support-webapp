
import { Col, Row, Card, Image,Dropdown, DropdownButton,Button, ListGroup, ProgressBar,Form,InputGroup } from '@themesberg/react-bootstrap';
import DropdownItem from '@themesberg/react-bootstrap/lib/esm/DropdownItem';
import React from 'react'
import DropdownMenu from 'react-overlays/esm/DropdownMenu';

export default function DropDownMenu() {
    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                Transfert
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item>Mise à jour du statut</Dropdown.Item>
                <Dropdown.Item>Solde fournisseur</Dropdown.Item>
                <Dropdown.Item>Vérification du statutt</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
