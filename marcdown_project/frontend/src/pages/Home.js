import React, { Component } from "react";
import Card from "../components/Card.js"
import query from "../helpers.js";

class Home extends Component {
  constructor(params) {
    super(params);
    this.state = {
      ownCards: [],
      sharedCards: [],
    };

    this._loadCards();
  }

  _loadCards() {
    query("/api/user").then((result) => {
      console.log(result);
      this.setState({
        ownCards: result.own_notes,
        sharedCards: result.shared_notes,
      });
    }).catch((err) => {
      console.error(err);
      reject();
    });
  }

  render() {
    return (
      <div>
        <div id="tags-container">
          <span id="tags-header">Tags</span>
          <input type="text" />
          <div id="tags-list">
            <p>HE-Arc (2)</p>
            <p>Test (4)</p>
            <p>Games (1)</p>
          </div>
        </div>
        <div id="note-container">
          <h1>My notes</h1>
          <div>
            {this.state.ownCards.map((card, key) =>
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