import React from 'react';

const WeatherForm = (props) => {
    
   
        return (
            <form onSubmit = {props.loadWeather} >
                <input type="text" name="city" placeholder="City.." />
                <input type="text" name="country" placeholder="Country" />
                <button>send</button>
            </form>

        )    
}
export default WeatherForm;