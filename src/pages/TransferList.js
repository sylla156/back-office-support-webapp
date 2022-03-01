import {Card} from '@themesberg/react-bootstrap';


import React from "react";
import TransferListSearch from '../components/transferList/TransferListSearch';
import TransferListAll from '../components/transferList/TransferListAll';
export default () => {

    return (
        <>
            <Card border="light" className="mb-2 shadow-sm" >
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3">
                    <TransferListSearch />
                </div>
            </Card>

            <div>
                <TransferListAll/>
            </div>
        </>
    );

}


