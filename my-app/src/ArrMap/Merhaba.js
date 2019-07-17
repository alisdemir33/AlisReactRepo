import React from 'react'

class MerhabaDunya extends React.Component {

    render() {
        return <div> Merhaba Dünya from <b>{this.props.isim}</b> which is <b>{this.props.yas}</b> years old </div>;
    }
}

export default MerhabaDunya;