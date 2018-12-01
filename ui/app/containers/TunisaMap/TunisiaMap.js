import React, { Component } from 'react';

import './style.css'
import mapData from './data';

// must have handleSelection function as props
class TunisiaMap extends Component {
    constructor(props){
        super();
        this.initState = {
            governances: mapData.governances.map(gov => {
                return {
                    ...gov,
                    selected: false,
                };
            }),
        };
        this.state = {
            ...this.initState,
        }
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            governances: this.state.governances.map(gov => {
                return {
                    ...gov,
                    selected: e.target.id === gov.id ? true : false,
                }
            })
        })
        this.props.handleSelection(e.target.id);
    }

    render() {
        return (
            <div>
                <svg baseprofile="tiny" fill="#7c7c7c"  stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" version="1.2"viewBox="0 0 3027 4736" width="300" height="469" xmlns="http://www.w3.org/2000/svg">
                    {
                        this.state.governances.map(governance => (
                            <path
                                className={governance.selected? 'selected':'not-selected'}
                                d={governance.layer}
                                id={governance.id}
                                name={governance.name} 
                                key={governance.id}
                                onClick={this.handleClick.bind(this)}
                            />
                        ))
                    }
                   
                    <circle cx="823.5" cy="805.7" id="0">
                    </circle>
                    <circle cx="821.9" cy="186.8" id="1">
                    </circle>
                    <circle cx="499.6" cy="579.9" id="2">
                    </circle>
                </svg>              
            </div>
        );
    }
}

export default TunisiaMap;
