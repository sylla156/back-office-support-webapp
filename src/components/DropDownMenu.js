
import { Dropdown } from '@themesberg/react-bootstrap';
import React from 'react'

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
