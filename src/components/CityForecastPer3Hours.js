import React from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import './CityForecastPer3Hours.css';

class CityForecastPer3Hours extends React.Component {
    render() {
        return(
            <Card>
                <CardBody>
                    <CardTitle>
                        <Row>
                            <Col xs="6">
                                <img src={"http://openweathermap.org/img/w/" + this.props.icon + ".png"} alt="" />
                            </Col>
                            <Col xs="6" className="forecast-time">
                                {this.props.time}
                            </Col>
                        </Row>
                    </CardTitle>
                    <CardText>
                        <Row>
                            <Col xs="6">Temperatur:</Col>
                            <Col xs="6">{this.props.temp} °C</Col>
                        </Row>
                        <Row>
                            <Col xs="6">Wind:</Col>
                            <Col xs="6">{this.props.wind.speed} m/s</Col>
                        </Row>
                        <Row>
                            <Col>Richtung:</Col>
                            <Col>{this.props.wind.deg} Grad</Col>
                        </Row>
                        <Row>
                            <Col>Luftfeuchte:</Col>
                            <Col>{this.props.humidity} %</Col>
                        </Row>
                        <Row>
                            <Col>Luftdruck:</Col>
                            <Col>{this.props.pressure} hPa</Col>
                        </Row>
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

export default CityForecastPer3Hours;