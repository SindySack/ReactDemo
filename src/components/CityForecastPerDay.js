import React from 'react';
import CityForecastPer3Hours from './CityForecastPer3Hours';
import { Row, Col } from 'reactstrap';
import './CityForecastPerDay.css';

class CityForecastPerDay extends React.Component {  
    render() {
        let weekDays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
        return (
            <div>
                <h2>{weekDays[this.props.day]}</h2>
                <Row>
                    {this.props.forecast.map(function(forecast) {
                        return(
                            <Col lg="3" key={forecast.time} className="day-hour">
                                <CityForecastPer3Hours
                                    time={forecast.time}
                                    icon={forecast.icon}
                                    temp={forecast.temp}
                                    wind={forecast.wind}
                                    humidity={forecast.humidity}
                                    pressure={forecast.pressure}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

export default CityForecastPerDay;