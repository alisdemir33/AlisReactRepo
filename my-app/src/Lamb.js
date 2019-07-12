
import React from 'react'

class Room extends React.Component {

    constructor(props) {

        super(props)
        this.state = { isLit: true }

    }

    render() {
        const brightness = this.state.isLit == true ? "btn btn-success" : "btn btn-danger";
        return (<div className={`table ${brightness}`}>room is {this.state.isLit == true ? 'YEŞİL :)' : 'KİRMİZİ :( '}
            <br />
            <button className="btn btn-info" onClick={this.flipLight}> FLİP </button>
            <button className="btn btn-warning" onClick={this.turnOff}> OFF </button>
            <button className="btn btn-success" onClick={this.turnOn}> ON </button>
        </div>);
    }

    flipLight = () => {
        this.setState(
            {
                isLit: !this.state.isLit
            });
    }
    
    turnOn = () => {

        if (this.state.isLit == true)
            alert('yeter daa basma yandık işte;');
        else
            this.setState({ isLit: true })
    }

    turnOff = () => {
        this.setState({ isLit: false })
    }

}
export default Room;