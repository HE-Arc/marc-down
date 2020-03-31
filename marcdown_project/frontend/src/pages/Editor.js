import React, { Component } from "react";

class Editor extends Component {
  render() {
    return (
      <div>
        <div>
          <div></div>
          <textarea value={"Editing note with ID:" + this.props.match.params.id} readOnly></textarea>
        </div>
        <div></div>
      </div>
    );
  }
}

export default Editor;