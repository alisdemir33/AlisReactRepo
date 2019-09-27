import React from 'react';
import ReactDom from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';

class StarRating extends React.Component {

    constructor() {
        super();
        this.state = { 
            rating: 1 
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }


    setStarFromServer = async (e) => {
        e.preventDefault();
         const city = 0;//e.target.elements.city.value;
        const country = 0;//e.target.elements.country.value; */

        var response = null;
        if (city==0 && country==0) {

         //   const Api_Key = '4367fe3bd34c13c1ec198b485cff42ae';
            const api_call = await fetch(`http://localhost:1135/api/Values/2`);
            response = await api_call.json();
            alert(response)   ;
            console.log(response.value);
            this.setState({
                rating:response
               /*  temperature: response.main.temp,
                city: response.name,
                country: response.sys.country,
                humidity: response.main.humidity,
                description: response.weather[0].description,
                error: "" */
            })
        } else {
            this.setState({
                rating: 9
            })
        }

        console.log(response);
    }



    render() {
        const {rating} =this.state;
        return (
            <div>
                <h2>Rating From state :{rating}</h2>
                <StarRatingComponent
                    name="rate1"
                    starCount={10}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
                 <button className="btn btn-info" onClick={this.setStarFromServer}> FLİP </button>
            </div>

        );

    }

}
export default StarRating;