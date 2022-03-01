import {Button, Col, InputGroup, Row} from "@themesberg/react-bootstrap";
import React, {useState} from 'react';
import {powerList} from "./powerSlideConst/powerConst";

export default function PowerSildeInsertion() {

    const [visibleTab, setVisibleTab] = useState(powerList[0].id);

    return (
        <>
            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    <Col xs={12} md={6} lg={6} className="mb-2 px-2">
                        <InputGroup>
              
                            {powerList.map((item)=>(
                                <Button variant="outline-primary" key={item.id} onClick={ ()=>{

                                    setVisibleTab(item.id)

                                } } className="mx-2" active={visibleTab === item.id} type="button">
                                    {item.name}
                                </Button>
                            ))}
                        </InputGroup>
                    </Col>
                </Row>
            </div>
            {
                powerList.map((item)=>(
                    <>
                        {
                            visibleTab === item.id && <Col>
                                <iframe
                                    src={item.url}
                                    title={item.title}
                                    style={{margin: "30px 0", display: "block"}}
                                    width="100%"
                                    height="800"
                                ></iframe>
                            </Col>
                        }
                    </>
                ))
            }
      
        </>
    );

}
