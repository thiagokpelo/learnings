import React, { Component } from 'react';
import FotoItem from './FotoItem';

export default class Timeline extends Component {

    componentDidMount() {
        fetch("http://localhost:8080/api/public/fotos/alots")
    }

    render() {
        return (
            <div className="fotos container">
                <FotoItem />
                <FotoItem />
            </div>
        );
    }
}
