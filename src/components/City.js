import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import './City.css';

class City extends React.Component {

    //Callback Funktion -> Das Löschen der Stadt wird nach oben weitergegeben
    handleDeleteClick = () => {
        this.props.deleteCity(this.props.id);
    }

    render() {
        //Anlegen der Variablen für die Informationen
        let temp, pressure, humidity, icon;

        //Falls es eine Weile dauert, um die Daten von der API zu erhalten
        if(this.props.loading) {
            temp = '--';
            pressure = '--';
            humidity = '--';
            icon = (
                <div className="icon loading">
                    <i className="fa fa-spinner fa-spin"></i>
                </div>
            );
        } else {
            temp = this.props.temp;
            pressure = this.props.pressure;
            humidity = this.props.humidity;
            icon = (
                <img src={"http://openweathermap.org/img/w/" + this.props.iconId + ".png"}
                    className="icon" width="80px" alt=""/>
            );
        }


        return (
            <Card>
                {icon}
                <CardBody className="city-info">
                    <CardTitle>
                        <Row>
                            <Col xs="9">
                                {this.props.name}
                            </Col>
                            <Col xs="3">
                                <Button color="danger" outline size="sm"
                                    className="float-right"
                                    onClick={this.handleDeleteClick}>
                                    Löschen
                                </Button>
                            </Col>
                        </Row>
                    </CardTitle>
                    <CardSubtitle>
                        <Row>
                            <Col>
                                Temperatur: {temp} °C
                            </Col>
                            <Col className="text-center">
                                Luftdruck: {pressure} hPa 
                            </Col>
                            <Col className="text-right">
                                Luftfeuchte: {humidity} %
                            </Col>
                        </Row>
                    </CardSubtitle>
                    <Link to={"/forecast/" + this.props.name}>5 Tage Vorschau</Link>
                </CardBody>
            </Card>
        );
    }
}

export default City;