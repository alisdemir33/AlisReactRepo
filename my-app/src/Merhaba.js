import React from 'react'

class MerhabaDunya extends React.Component {

    render() {
        return <div> Merhaba Dünya from {this.props.isim} {this.props.yas} </div>;
    }
}

export default MerhabaDunya;