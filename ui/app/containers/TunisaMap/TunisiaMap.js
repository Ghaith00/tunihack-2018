import React, { Component } from 'react';

import './style.css';
import mapData from './data';

// must have handleSelection function as props
class TunisiaMap extends Component {
  constructor(props) {
    super(props);
    this.initState = {
      governances: mapData.governances.map(gov => ({
        ...gov,
        selected: false,
      })),
    };
    this.state = {
      ...this.initState,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected && nextProps.selected !== this.props.selected) {
      this.setState({
        selected: nextProps.selected,
        governances: this.state.governances.map(gov => {
          return {
            ...gov,
            selected: nextProps.selected === gov.name ? true : false,
          };
        }),
      });
    }
  }

  handleClick = name => {
    // e.preventDefault();
    this.setState({
      selected: name,
      governances: this.state.governances.map(gov => {
        return {
          ...gov,
          selected: name === gov.name ? true : false,
        };
      }),
    });
    console.log(name);
    this.props.handleSelection(name);
  };

  render() {
    return (
      <div>
        <svg
          baseprofile="tiny"
          fill="#27ae60"
          stroke="#ffffff"
          // stroke-linecap="round"
          // stroke-linejoin="round"
          // stroke-width="2"
          version="1.2"
          viewBox="0 0 1000 2200"
          width="300"
          height="500"
          xmlns="http://www.w3.org/2000/svg"
        >
          {this.state.governances.map(governance => (
            <path
              fill="#16a085"
              className={governance.selected ? 'selected' : 'not-selected'}
              d={governance.layer}
              id={governance.id}
              name={governance.name}
              key={governance.id}
              onClick={() => this.handleClick(governance.name)}
            />
          ))}

          <circle cx="823.5" cy="805.7" id="0" />
          <circle cx="821.9" cy="186.8" id="1" />
          <circle cx="499.6" cy="579.9" id="2" />
        </svg>
      </div>
    );
  }
}

export default TunisiaMap;
