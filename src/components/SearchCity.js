import React from 'react';
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

class SearchCity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }
    
    //Stadt mit Namen suchen und in die Liste eintragen
    handleClick = (event) => {
        console.log('foo');
        event.preventDefault();
        this.props.searchClickHandler(this.state.name);
        this.setState(() => ({
            name: ''
        }));
    }

    //Eingabefeld: übernimmt die Eingabe des Nutzers
    changeName = (event) => {
        const newName = event.target.value;

        this.setState(() => ({
            name: newName
        }));
    }
    
    render() {
        return (
            <form onSubmit={this.handleClick}>
                <InputGroup>
                    <Input
                        value={this.state.name}
                        id="City"
                        placeholder="Stadtname"
                        onChange={this.changeName}
                        />
                    <InputGroupAddon addonType="append">
                        <Button color="success" outline onClick={this.handleClick}>
                            Hinzufügen
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </form>
        );
    }
}

export default SearchCity;