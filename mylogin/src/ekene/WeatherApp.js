import React from 'react'
import Weather from './weather';
import Titles from './Title';
import WeatherForm from './form';
import '.././WeatherApp.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import { thisExpression } from '@babel/types';

class WeatherApp extends React.Component {

    constructor(props) {
        console.log('weather worked..')
        super(props);
        this.getWeather = this.getWeather.bind(this);

        this.state = {
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: undefined,
            isLoading: false,
        }
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        var response = null;
        if (city && country) {

            const Api_Key = '4367fe3bd34c13c1ec198b485cff42ae';
            //const api_call = await 
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Bilinmeyen hata oluştu!')
                    }
                })
                .then(response => {
                    this.setState({
                        temperature: response.main.temp,
                        city: response.name,
                        country: response.sys.country,
                        humidity: response.main.humidity,
                        description: response.weather[0].description,
                        error: ""
                    })
                })
                .catch(error => this.setState({ error, isLoading: false }));
            // response = await api_call.json();


        } else {
            this.setState({
                error: "Please enter the values..."
            })
        }

        console.log(response);
    }

    render() {
        const { hits, isLoading, error } = this.state;
        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return <div>
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-5 title-container">
                                <Titles />
                            </div>
                            <div className="col-xs-7 form-container">
                                <WeatherForm loadWeather={this.getWeather} />
                                <Weather
                                    temperature={this.state.temperature}
                                    city={this.state.city}
                                    country={this.state.country}
                                    humidity={this.state.humidity}
                                    description={this.state.description}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(WeatherApp);