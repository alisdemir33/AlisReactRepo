import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Col, Row } from 'reactstrap';

const VakifForm = (props) => {


    return (
        <Container className="App">
            <Form onSubmit={props.getVakifListFromServerFunction} >
                <Row>
                    <Col lg="3" md="6">
                        <FormGroup>
                            <Label>Vakıf İli</Label><Input type="text" name="ProvinceName" placeholder="İl.." />
                        </FormGroup>
                    </Col>
                    <Col lg="3" md="6">
                        <FormGroup>
                            <Label>Vakıf İlçesi</Label>  <Input type="text" name="CountyName" placeholder="İlçe" />
                        </FormGroup>
                    </Col>
                    <Col lg="3" md="6">
                        <FormGroup>
                            <Label>Sayfa Boyut</Label>  <Input type="text" name="PageSize" placeholder="Sayfa Kayıt Sayısı" />
                        </FormGroup>
                    </Col>            

                </Row>
                <Row>
                    <Col lg="3" md="6">
                        <FormGroup>
                            <Button color="primary"> Sorgula </Button>
                        </FormGroup>
                    </Col>
                </Row>
                <Row> <Col lg="3" md="6">
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default VakifForm;