import React from 'react';

class CardController extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    moveLeftHandler(e){
        console.log(e);
    }

    moveRightHandler(e){
        console.log(e);
    }

    render(){
        return (
            <div className='card-controller'>
                <p>Simple Card Controller</p>
                <button onClick={this.moveLeftHandler.bind(this)}>&lang;</button>
                <button onClick={this.moveRightHandler.bind(this)}>&rang;</button>
            </div>
        ); 
    }
}

export default CardController;