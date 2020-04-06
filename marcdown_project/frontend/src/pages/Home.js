import React, { Component } from "react";
import Card from "../components/Card.js"

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
            <Card tags={["Test 1", "Test 2"]} stared={true} owner="Owner">My Note name</Card>
            <Card tags={["Test 2", "Test 5"]} stared={false} owner="Owner">My Note na sadf dasf me</Card>
            <Card tags={["Test 3", "Test 3"]} stared={true} owner="Owner">My warotesdaf  name</Card>
            <Card tags={["Test 4", "Test 1"]} stared={true} owner="Owner">My N asttote name</Card>
          </div>
          <h1>Shared with me</h1>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Home;