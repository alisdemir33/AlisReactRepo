import React from 'react' 

class CounterSub    extends React.Component
{ 
return
render ()
{

  return  <div>
    Sayaca { this.props.sayac} keez bastın
    {10- this.props.sayac} kez daha bascan
    <button onClick={this.props.artir}> Sayaca Tıklasana
    </button>
    </div>;
 

     }
    }

export default CounterSub