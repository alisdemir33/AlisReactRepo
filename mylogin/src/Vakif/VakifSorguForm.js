import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Col, Row } from 'reactstrap';

const VakifForm = (props) => {


    return (
        <Container className="App">
            <Form onSubmit={props.getVakifListFromServerFunction} >
                <Row>
                    <Col lg="3" md="6">
                        <FormGroup>
                            <Label>Vakıf İli</Label><Input type="text" name="City" placeholder="İl.." />
                        </FormGroup>
                    </Col>
                    <Col lg="3" md="6">
                        <FormGroup>
                            <Label>Sayfa Boyut</Label>  <Input type="text" name="PageSize" placeholder="Sayfa Sayısı" />
                        </FormGroup>
                    </Col>
                    <Col lg="3" md="6">
                        <FormGroup>
                            <Label>Sayfa No</Label>  <Input type="text" name="PageNumber" placeholder="Sayfa No" />
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
            </Form>
        </Container>
    )
}

export default VakifForm;