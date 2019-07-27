import React from 'react'
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
import { randomFillSync } from 'crypto';
var weatherData = {

    content: {

        Adana: [

            {
                DayName: "Mon",
                State: "Cloudy",
                Day: 21,
                Night: 10
            },
            {
                DayName: "Tue",
                State: "Sunny",
                Day: 30,
                Night: 15
            },
            {
                DayName: "Wed",
                State: "Rainy",
                Day: 45,
                Night: 20

            }
        ],

        Kastamonu: [
            {
                DayName: "Mon",
                State: "Partly",
                Day: 23,
                Night: 12
            },
            {
                DayName: "Tue",
                State: "Sunny",
                Day: 24,
                Night: 10
            },
            {
                DayName: "Wed",
                State: "Rainy",
                Day: 37,
                Night: 16
            }
        ]
    }
}

class WeatherWidget extends React.Component {

    render() {
        var contentKeys = Object.keys(weatherData.content);

        var cityRow = contentKeys.map((index)  =>
           
       // alert(contentKeys[0])
            weatherData.content[index].map((day,index) =>
               ( <div> { contentKeys[index] }  City:{day.DayName} Durum: {day.State} gündüz:  {day.Day} Gece: {day.Night} </div>)
            )
            );          
        


        return (
            <div>{cityRow}</div>
        )
    }

}
export default WeatherWidget;