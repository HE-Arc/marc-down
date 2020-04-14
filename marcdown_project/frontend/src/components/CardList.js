import React, { Component } from "react";

import Card from "../components/Card.js"

export default class CardList extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * @param {object} card 
     * @return true if the card matches tagSearch and nameSearch props
     */
    _noteMatchSearch(card) {
        const tagSearch = this.props.tagSearch.toLowerCase();
        const nameSearch = this.props.nameSearch.toLowerCase();

        // Nothing searched, display all
        if (tagSearch === "" && nameSearch === "") {
            return true;
        }

        // Searched for a name
        if (nameSearch !== "") {
            // Bugfix in case title is not set, which can be the case with the API
            const cardName = (card.title || "untitled").toLowerCase();
            if (!cardName.includes(nameSearch) && !nameSearch.includes(cardName)) {
                return false;
            }
        }

        if (tagSearch === "") {
            // Found matching name and no tag search
            return true;
        }
        else {
            for (let i = 0; i < card.tags.length; i++) {
                const tagName = card.tags[i].name.toLowerCase();
                if (tagName.includes(tagSearch) || tagSearch.includes(tagName)) {
                    return true;
                }
            }
        }

        return false;
    }

    render(...rest) {
        let cards = this.props.cards;
        cards = cards.filter((card) => this._noteMatchSearch(card)).map(
            (card, key) => {
                const title = card.title || "Untitled";
                return <Card card={card} key={key}>{title}</Card>;
            }
        );

        return (
            cards.length === 0 ? "Nothing to display here." : cards
        );
    }
}