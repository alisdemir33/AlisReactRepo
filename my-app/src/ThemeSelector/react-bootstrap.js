import React, { Component } from 'react';
import { SplitButton,DropdownItem } from 'react-bootstrap';

 class ReactBootstrapThemeSwitcher extends Component {

  state = { theme: null }
  
  chooseTheme = (theme, evt) => {
    evt.preventDefault();
    if (theme.toLowerCase() === 'reset') { theme = null }
    this.setState({ theme });
  }
  
  render() {
  
    const { theme } = this.state;
    const themeClass = theme ? theme.toLowerCase() : 'default';
    alert(themeClass)
    const parentContainerStyles = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'table'
    };
    
    const subContainerStyles = {
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'table-cell',
      verticalAlign: 'middle'
    };
    
    return (
      <div style={parentContainerStyles}>
        <div style={subContainerStyles}>
        
          <span className={`h1 center-block text-center text-${theme ? themeClass : 'muted'}`} style={{ marginBottom: 25 }}>{theme || 'Default'}</span>
          
          <div className="center-block text-center">
            <SplitButton bsSize="large" bsStyle="Danger" title={`${theme || 'Defaultt'} Theme`}>
              <DropdownItem eventKey="Primary" bsStyle={themeClass} onSelect={this.chooseTheme}>Primary Theme</DropdownItem>
              <DropdownItem eventKey="Danger" bsStyle={themeClass} onSelect={this.chooseTheme}>Danger Theme</DropdownItem>
              <DropdownItem eventKey="Success" bsStyle={themeClass} onSelect={this.chooseTheme}>Success Theme</DropdownItem>
              <DropdownItem divider />
              <DropdownItem eventKey="Reset" bsStyle={themeClass} onSelect={this.chooseTheme}>Default Theme</DropdownItem>
            </SplitButton>
          </div>
          
        </div>
      </div>
    );
    
  }
  
}

export default ReactBootstrapThemeSwitcher;