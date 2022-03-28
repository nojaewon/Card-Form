import React from 'react';
import Card from './Card';

class CardController extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            styleIndex: [0, 1, 2],
        };

        this.cardList = [
            <Card value={this.state.styleIndex[0]} cardInfo={this.props.cardInfo[0]}/>,
            <Card value={this.state.styleIndex[1]} cardInfo={this.props.cardInfo[1]}/>,
            <Card value={this.state.styleIndex[2]} cardInfo={this.props.cardInfo[2]}/>
        ];

        this.cardTags = document.body.getElementsByClassName('card-container');
    }

    leftMove(e){
        const styleIndex = this.state.styleIndex;
        for(let i=0; i<this.props.cardInfo.length; i++){

            const prevClass = 'card-style-' + styleIndex[i]
            styleIndex[i] = (styleIndex[i]+2)%3;
            const nextClass = 'card-style-' + styleIndex[i];

            
            this.cardTags[i].classList.remove(prevClass);
            this.cardTags[i].classList.add(nextClass);
        }

        this.setState({
            styleIndex: styleIndex,
        });
    }

    rightMove(e){
        const styleIndex = this.state.styleIndex;
        for(let i=0; i<this.props.cardInfo.length; i++){

            const prevClass = 'card-style-' + styleIndex[i]
            styleIndex[i] = (styleIndex[i]+1)%3;
            const nextClass = 'card-style-' + styleIndex[i];

            
            this.cardTags[i].classList.remove(prevClass);
            this.cardTags[i].classList.add(nextClass);
        }

        this.setState({
            styleIndex: styleIndex,
        });
    }

    render(){
        return (
            <div>
                <div className='card-controller'>
                    <p>Simple Card Controller</p>
                    <button id="left-btn" onClick={this.leftMove.bind(this)}>&lang;</button>
                    <button id="right-btn" onClick={this.rightMove.bind(this)}>&rang;</button>
                </div>
                {this.cardList[0]}
                {this.cardList[1]}
                {this.cardList[2]}
            </div>
        ); 
    }
}

export default CardController;