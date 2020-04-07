import React, { Component } from "react";
import Card from "../components/Card.js"
import TagListItem from "../components/TagListItem.js"
import query from "../helpers.js";

class Home extends Component {
  constructor(params) {
    super(params);
    this.state = {
      ownCards: [],
      sharedCards: [],
      tags: {},
      tagSearchValue: "",
      nameSearchValue: ""
    };

    this._loadCards();
  }

  _loadCards() {
    query("/api/user").then((result) => {
      const allNotes = result.own_notes.concat(result.shared_notes);
      let tags = {};
      for (let i = 0; i < allNotes.length; i++) {
        const note = allNotes[i];

        // Set starred or not
        for (let j = 0; j < result.favorites.length; j++) {
          const favorite = result.favorites[j];

          if (favorite.id === note.id) {
            note.starred = true;
            break;
          }
        }

        // Calculate tag count
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
      
      this.setState({
        tags: tags,
        ownCards: result.own_notes,
        sharedCards: result.shared_notes,
      });
    }).catch((err) => {
      console.error(err);
      reject();
    });
  }

  _setSearchItem(tagName) {
    this.setState({ tagSearchValue: tagName });
  }

  _filterNotes(card) {
    const tagSearch = this.state.tagSearchValue.toLowerCase();
    const nameSearch = this.state.nameSearchValue.toLowerCase();

    if (tagSearch === "" && nameSearch === "") {
      return true;
    }

    if (nameSearch !== "") {
      const cardName = (card.title || "untitled").toLowerCase();
      if (!cardName.includes(nameSearch) && !nameSearch.includes(cardName)) {
        return false;
      }
    }

    if (tagSearch === "") {
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

  render() {
    return (
      <div>
        <div id="tags-container">
          <span id="tags-header">Tags</span>
          <input value={this.state.tagSearchValue} type="text" placeholder="Filter notes by tags" onChange={(e) => {
            this.setState({ tagSearchValue: e.target.value });
          }} />
          <div id="tags-list">
            {/* Default tag = clear */}
            <TagListItem clickAction={() => { this._setSearchItem("") }} key={-1} count={this.state.ownCards.length + this.state.sharedCards.length}>
              All notes
            </TagListItem>
            {Object.keys(this.state.tags).map((key, index) =>
              <TagListItem clickAction={(tagName) => { this._setSearchItem(tagName) }} key={index} count={this.state.tags[key]}>{key}</TagListItem>
            )}
          </div>
        </div>
        <div id="note-container">
          <p>Search a note: </p>
          <input id="input-search-note" value={this.state.nameSearchValue} type="text" placeholder="Filter notes by name" onChange={(e) => {
            this.setState({ nameSearchValue: e.target.value });
          }} />
          <h1>My notes</h1>
          <div>
            {this.state.ownCards.filter((card) => this._filterNotes(card)).map((card, key) =>
              <Card starred={card.starred} key={key} id={card.id} tags={card.tags} owner={card.owner.name}>{card.title || "Untitled"}</Card>
            )}
          </div>
          <h1>Shared with me</h1>
          <div>
            {this.state.sharedCards.filter((card) => this._filterNotes(card)).map((card, key) =>
              <Card starred={card.starred} key={key} id={card.id} tags={card.tags} owner={card.owner.name}>{card.title || "Untitled"}</Card>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;