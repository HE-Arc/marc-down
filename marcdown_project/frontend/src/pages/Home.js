import React, { Component } from "react";

import query from "../helpers.js";
import CardList from "../components/CardList.js";
import TagList from "../components/TagList.js";
import SearchBar from "../components/SearchBar.js";
import SearchTagBar from "../components/SearchTagBar.js";

/**
 * List all notes, allow filtering by tag and more
 */
class Home extends Component {
    constructor(params) {
        super(params);

        this.state = {
            cards: {
                owned: [],
                shared: [],
                public: []
            },
            tags: {},
            nameSearchValue: "",
            tagSearchValue: ""
        };

        this._loadCards();
    }

    /**
     * Load all cards from the API
     * TODO: Pagination
     * TODO: Fix function complexity by adding more information in the API
     */
    _loadCards() {
        query("/api/user").then((result) => {
            const allNotes = result.own_notes.concat(result.shared_notes);
            const tags = {};

            for (let i = 0; i < allNotes.length; i++) {
                const note = allNotes[i];
                note.starred = false;

                // Set starred or not
                for (let j = 0; j < result.favorites.length; j++) {
                    const favorite = result.favorites[j];

                    if (favorite.id === note.id) {
                        favorite.notPublic = true; // We are not the owner / not shared to us
                        note.starred = true;

                        // If the note is starred, with add a "starred" tag for search purposes
                        note.tags.push({ id: -1, name: "starred" });
                        break;
                    }
                }

                // Calculate tag count
                // NOTE: We have an API that tracks that, but due to time constraint it will not be used
                // TODO: Use tag API to retrieve tags info
                for (let j = 0; j < note.tags.length; j++) {
                    const tag = note.tags[j];

                    if (tags[tag.name] === undefined) {
                        tags[tag.name] = 1;
                    }
                    else {
                        tags[tag.name]++;
                    }

                }
            }

            const publicStarredCards = [];
            // We go trough all favorites one more time to find public notes
            for (let i = 0; i < result.favorites.length; i++) {
                const card = result.favorites[i];

                // Starred public note
                if (!card.notPublic) {
                    card.starred = true;
                    publicStarredCards.push(card);
                }
            }

            this.setState({
                tags: tags,
                cards: {
                    owned: result.own_notes,
                    shared: result.shared_notes,
                    public: publicStarredCards
                }
            });

        }).catch((err) => {
            console.error(err);
            reject();
        });
    }

    /**
     * Update tag search state
     * @param {string} value 
     */
    setTagSearch(value) {
        this.setState({ tagSearchValue: value });
    }

    /**
     * Update name search state
     * @param {string} value 
     */
    setNameSearch(value) {
        this.setState({ nameSearchValue: value });
    }

    render() {
        const totalCardCount = this.state.cards.owned.length + this.state.cards.shared.length + this.state.cards.public.length;

        return (
            <div>
                <div id="tags-container">
                    <span id="tags-header">Tags</span>
                    <SearchTagBar searchValue={this.state.tagSearchValue} onSearchChange={(v) => this.setTagSearch(v)} />
                    <TagList onTagSelected={(v) => this.setTagSearch(v)} tags={this.state.tags} totalCardCount={totalCardCount} />
                </div>
                <div id="note-container">
                    <p>Search a note: </p>
                    <SearchBar searchValue={this.state.nameSearchValue} onSearchChange={(v) => this.setNameSearch(v)} />
                    <h1>My notes</h1>
                    <CardList cards={this.state.cards.owned} tagSearch={this.state.tagSearchValue} nameSearch={this.state.nameSearchValue} />
                    <h1>Shared with me</h1>
                    <CardList cards={this.state.cards.shared} tagSearch={this.state.tagSearchValue} nameSearch={this.state.nameSearchValue} />
                    <h1>Starred public notes</h1>
                    <CardList cards={this.state.cards.public} tagSearch={this.state.tagSearchValue} nameSearch={this.state.nameSearchValue} />
                </div>
            </div>
        );
    }
}

export default Home;