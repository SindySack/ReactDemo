import React from 'react';
import City from './City';
import SearchCity from './SearchCity';
import { Alert, Button, Row, Col } from 'reactstrap';

class CityList extends React.Component {
    constructor(props) {
        super(props);
        this.newCityId = -1;

        //API Key direct von openweathermap
        this.API_KEY = '3987afb9904496f4e4bcc2cd1a548684';

        // Lade die Städte aus dem localStorage
        let cities = JSON.parse(localStorage.getItem('cities'));

        // Wenn keine Städte im localStorage gefunden wurden, nehme eine leere Liste
        if(!cities) {
            cities = [];
        }

        // Setze den initialen State und verwende die geladene Liste
        this.state = {
            cities: cities,
            error: {
                color: 'danger',
                message: ''
            }
        };
    }

    //eine Stadt der Liste hinzufügen
    addCity = (name) => {
        // Entferne eventuelle Leerzeichen am Anfang und am Ende des Namens
        name = name.trim();
        // Prüfe, ob eine Stadt mit demsleben Namen bereits in der Liste existiert
        for(let i = 0; i < this.state.cities.length; i++) {
            if(this.state.cities[i].name.toLowerCase() === name.toLowerCase()) {
                this.showInfo('warning', 'Die Stadt existiert bereits.');
                return;
            }
        }

        // Lege eine neue Stadt mit einer temporären ID and
        let newCity = {
            id: this.newCityId,
            name: name,
            iconId: '01d',
            pressure: 0,
            humidity: 0,
            temp: 0,
            loading: true
        }
        // Zähle die temporäre ID weiter
        // Wichtig, falls eine neue Stadt erstellt wird, während für die vorherige noch keine Daten geholt wurden
        this.newCityId--;

        localStorage.setItem('cities', JSON.stringify([...this.state.cities, newCity]));
        this.setState((prev) => ({
            //fügt eine neue Stadt(newCity) dem Array am Ende hinzu
            //... -> Spread-Operator nimmt alle Elemente einzeln aus dem Array 
            //und trägt sie in das neue Array ein
            cities: [...prev.cities, newCity]
        }));

        //Informationen von der API holen
        this.getCityInfo(newCity.id, name);
    }

    showInfo = (color, message) => {
        this.setState({
            error: {
                color: color,
                message: message
            }
        });

        let that=this;
        setTimeout(function() {
            that.setState({
                error: {
                    message: ''
                }
            });
        }, 5000);
    }

    getCityInfo = (id, name) => {
        // Generiert die URL um die Informationen der Städte zu erhalten
        // Beispiel: http://api.openweathermap.org/data/2.5/weather?q=Leipzig&APPID=3987afb9904496f4e4bcc2cd1a548684
        let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + name 
            + '&units=metric'
            + '&APPID=' + this.API_KEY;

        //Ansynchroner Aufruf und deshalb nur mit this nicht möglich
        //Kopie von this wird in that gespeichert
        let that = this;

        //Funktion um das JSON bei der Rückgabe der API auszulesen
        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // Wenn Rückagbe-Code 404 ist, wurde die Stadt nicht gefunden
                if(data.cod === '404') {
                    that.showInfo('warning', 'Die Stadt "' + name + '" wurde nicht gefunden');
                    that.deleteCity(id);  
                    return;                  
                } else if(data.cod !== 200) {
                    // Wenn alles funktioniert, ist der Code 200, für alle anderen wird ein Fehler ausgegeben
                    that.showInfo('warning', 'Beim Abfragen der API ist ein Fehler aufgetreten.');
                    that.deleteCity(id);
                    return;
                }

                let newCity = {
                    id: data.id,
                    name: data.name,
                    iconId: data.weather[0].icon,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    temp: data.main.temp,
                    loading: false
                };

                //Funktion um die Stadt mit den neuen Daten in das State Array zu schreiben
                that.updateCity(id, newCity);
            })

            //Fehlermeldung, wenn keine Verbindung zur API aufgebaut werden kann
            .catch(function(error) {
                that.showInfo('danger', 'Leider ist ein Fehler aufgetreten.');
                that.deleteCity(id);
            });
    }

    //Sucht die Stadt mittels ID im Array und überschreibt die Daten
    updateCity = (id, newCity) => {
        let cities = this.state.cities;
        for(let i = 0; i < cities.length; i++) {
            if(id === cities[i].id) {
                cities[i] = newCity;
                break;
            }
        }

        localStorage.setItem('cities', JSON.stringify(cities));
        this.setState({
            cities: cities,
            error: {
                color: 'danger',
                message: ''
            }
        });
    }

    //Liste komplett löschen
    clearList = () => {
        localStorage.setItem('cities', JSON.stringify([]));
        this.setState({
            cities: []
        });
    }

    //eine Stadt aus der Liste löschen
    deleteCity = (id) => {
        let current = this.state.cities;
        let index;

        for(let i=0; i < current.length; i++) {
            if(current[i].id === id) {
                index = i;
                break;
            }
        }

        if(typeof index === 'undefined') {
            return;
        }

        current.splice(index, 1);

        localStorage.setItem('cities', JSON.stringify(current));

        this.setState({
            cities: current
        }); 
    }
    
    render () {
        let info = '';

        if(this.state.error.message !== '') {
            info = (
                <Alert color={this.state.error.color}>
                    <i className="fa fa-exclamation-triangle"></i>
                    <span> {this.state.error.message}</span>
                </Alert>
            )
        }

        return (
            <div>
                <Row className="top-buffer">
                    <Col lg={{ size: 6, offset: 2}}
                        xs="9">
                        <SearchCity 
                            searchClickHandler = {this.addCity}
                        />
                    </Col>
                    <Col lg="2" xs="3">
                        <Button color="danger" outline
                            className="float-right"
                            onClick={this.clearList}>
                            Reset
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        {info}
                    </Col>
                </Row>
                {this.state.cities.map((city) => 
                    <Row key={city.id} className="top-buffer">
                        <Col lg={{ size: 8, offset: 2}}>
                            <City
                                id = {city.id}
                                name = {city.name}
                                iconId = {city.iconId}
                                temp = {city.temp}
                                pressure = {city.pressure}
                                humidity = {city.humidity}
                                deleteCity = {this.deleteCity}
                                loading = {city.loading}
                            />
                        </Col>
                    </Row>
                )}
            </div>
        );
    }
}

export default CityList;