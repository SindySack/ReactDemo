import React from 'react';
import CityForecastPerDay from './CityForecastPerDay';
import { Alert } from 'reactstrap';

class CityForecast extends React.Component {
    constructor(props) {
        super(props);

        this.API_KEY = '';

        this.state = {
            days: [],
            loading: true,
            error: false,
            name: ''
        };
    }

    //wird ausgeführt sobald die Komponente einmal gerendert wurde
    componentDidMount() {
        let name = this.props.match.params.name;
        console.log('this.props', this.props);

        this.setState({
            name: name
        });

        let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + name 
        + '&units=metric'    
        + '&APPID=' + this.API_KEY;

        let that = this;

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log('data', data);
                let days = [];
                let actualDay;

                for(let i = 0; i < data.list.length; i++) {
                    let current = data.list[i];
                    let date = new Date(current.dt *1000);
                    
                    if(typeof actualDay === 'undefined') {
                        actualDay = {
                            day: date.getDay(),
                            forecast: []
                        };
                    }

                    if(actualDay.day !== date.getDay()) {
                        days.push(actualDay);
                        actualDay = {
                            day: date.getDay(),
                            forecast: []
                        };
                    }

                    actualDay.forecast.push({
                        time: that.addZero(date.getHours()) + ':' + that.addZero(date.getMinutes()),
                        icon: current.weather[0].icon,
                        temp: current.main.temp,
                        wind: {
                            speed: current.wind.speed,
                            deg: current.wind.deg
                        },
                        humidity: current.main.humidity,
                        pressure: current.main.pressure
                    });

                    if(i === data.list.length - 1) {
                        days.push(actualDay);
                    }
                }

                that.setState({
                    days: days,
                    loading: false,
                    error: false
                });
            })

            //Fehlermeldung, wenn keine Verbindung zur API aufgebaut werden kann
            .catch(function(error) {
                that.setState({
                    days: [],
                    loading: false,
                    error: true
                });
            });
    }

    addZero = (i) => {
        if(i < 10) {
            i = '0' + i;
        }
        return i;
    }

    render () {
        console.log('state.days', this.state.days);

        let info = '';
        
        if(this.state.loading) {
            info = (
                <Alert color="info">
                    <i className="fa fa-spinner fa-spin"></i>
                    <span> Lade Informationen</span>
                </Alert>
            );
        }

        if(this.state.error) {
            info = (
                <Alert color="danger">
                    <i className="fa fa-exclamation-triangle"></i>
                    <span> Leider ist ein Fehler aufgetreten.</span>
                </Alert>
            );
        }

        return (
        <div>
            <h1>5 Tage Vorschau für {this.state.name}</h1>
            {info}
            {this.state.days.map(function(day) {
                return(
                    <CityForecastPerDay 
                        key={day.day}
                        day={day.day}
                        forecast={day.forecast}
                    />
                );
            })}
        </div>
        );
    }
}

export default CityForecast;
