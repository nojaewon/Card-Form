import React from 'react';
import Card from './Card';
import CardController from './cardController';

class CardApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cardInfo:[
                {
                    author: "Czech based",
                    title: "UI/UX Designer",
                    contents: [
                        [0, "Andrey is driven by turning ideas into scalable and empowering experiences that solve real life problems."],
                        [1, "He is currently the founder of Dvorak media. Previously, Andrey Was a product designer at Dropbox."],
                        [2, "Over the years, Michael has been priviledged to have worked with Adobe, Evernote, Square and more."]
                    ],
                    imageInfo: ['card2.jpg', 'card image'],
                },
                {
                    author: "Czech based",
                    title: "UI/UX Designer",
                    contents: [
                        [0, "Andrey is driven by turning ideas into scalable and empowering experiences that solve real life problems."],
                        [1, "He is currently the founder of Dvorak media. Previously, Andrey Was a product designer at Dropbox."],
                        [2, "Over the years, Michael has been priviledged to have worked with Adobe, Evernote, Square and more."]
                    ],
                    imageInfo: ['card1.jpg', 'card image'],
                },
                {
                    author: "Czech based",
                    title: "UI/UX Designer",
                    contents: [
                        [0, "Andrey is driven by turning ideas into scalable and empowering experiences that solve real life problems."],
                        [1, "He is currently the founder of Dvorak media. Previously, Andrey Was a product designer at Dropbox."],
                        [2, "Over the years, Michael has been priviledged to have worked with Adobe, Evernote, Square and more."]
                    ],
                    imageInfo: ['card3.jpg', 'card image'],
                }
            ]
        };
    }

    render(){
        return (
            <div className='cardApp'>
                <CardController cardInfo={this.state.cardInfo}/>
            </div>
        );
    }
}

export default CardApp;