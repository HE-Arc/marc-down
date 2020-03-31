import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <span>Tags</span>
          <input type="text" />
          <div>
            {/* tag list */}
          </div>
        </div>
        <div>
          <h1>My notes</h1>
          <div></div>
          <h1>Shared with me</h1>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Home;