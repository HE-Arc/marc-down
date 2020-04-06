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
      tagSearchValue: ""
    };

    this._loadCards();
  }

  _loadCards() {
    query("/api/user").then((result) => {
      this.setState({
        ownCards: result.own_notes,
        sharedCards: result.shared_notes,
      });

      const allNotes = result.own_notes.concat(result.shared_notes);
      let tags = {};
      for (let i = 0; i < allNotes.length; i++) {
        const card = allNotes[i];
        for (let j = 0; j < card.tags.length; j++) {
          const tag = card.tags[j];
          if (tags[tag.name] === undefined) {
            tags[tag.name] = 1;
          }
          else {
            tags[tag.name]++;
          }
        }
      }

      this.setState({
        tags: tags
      });
    }).catch((err) => {
      console.error(err);
      reject();
    });
  }

  _setSearchItem(tagName) {
    this.setState({ tagSearchValue: tagName });
  }

  _searchTagFilter(card) {
    const searchValue = this.state.tagSearchValue.toLowerCase();
    if (searchValue === "") {
      return true;
    }
    else {
      for (let i = 0; i < card.tags.length; i++) {
        const tagName = card.tags[i].name.toLowerCase();
        if (tagName.includes(searchValue) || searchValue.includes(tagName)) {
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
          <h1>My notes</h1>
          <div>
            {this.state.ownCards.filter((card) => this._searchTagFilter(card)).map((card, key) =>
              <Card key={key} id={card.id} tags={card.tags} stared={true} owner={card.owner.name}>{card.title || "Untitled"}</Card>
            )}
          </div>
          <h1>Shared with me</h1>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Home;