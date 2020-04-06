import React, { Component } from "react";

class Home extends Component {
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
            <div class="note-card">
              <div class="note-star">S</div>
              <span class="title">My Note Name</span>
              <div>
                <span class="note-tag">Tag 1</span>
                <span class="note-tag">Tag 2</span>
                <span class="note-tag">Tag 3</span>
              </div>
              <div class="note-owner">Owner</div>
            </div>
            <div class="note-card">
              <div class="note-star">S</div>
              <span class="title">My Note Name</span>
              <div>
                <span class="note-tag">Tag 1</span>
                <span class="note-tag">Tag 2</span>
                <span class="note-tag">Tag 3</span>
              </div>
              <div class="note-owner">Owner</div>
            </div>
            <div class="note-card">
              <div class="note-star">S</div>
              <span class="title">My Note Name</span>
              <div>
                <span class="note-tag">Tag 1</span>
                <span class="note-tag">Tag 2</span>
                <span class="note-tag">Tag 3</span>
              </div>
              <div class="note-owner">Owner</div>
            </div>
            <div class="note-card">
              <div class="note-star">S</div>
              <span class="title">My Note Name</span>
              <div>
                <span class="note-tag">Tag 1</span>
                <span class="note-tag">Tag 2</span>
                <span class="note-tag">Tag 3</span>
              </div>
              <div class="note-owner">Owner</div>
            </div>
            <div class="note-card">
              <div class="note-star">S</div>
              <span class="title">My Note Name</span>
              <div>
                <span class="note-tag">Tag 1</span>
                <span class="note-tag">Tag 2</span>
                <span class="note-tag">Tag 3</span>
              </div>
              <div class="note-owner">Owner</div>
            </div>
          </div>
          <h1>Shared with me</h1>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Home;