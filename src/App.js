import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
let marked = require("marked");
// INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
} // Also, in order to get links to work, you must add <base target="_blank"> in the <head> section


 class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      editorMarkup: editorMarkup, // editorMarkup holds un'marked' text in editor
      previewedMarkup: marked(editorMarkup) // previewedMarkup holds the current markdown text
    }
    this.handleStateUpdate = this.handleStateUpdate.bind(this);  // updates the state for previewedMarkup and editorMarkup
  }

  handleStateUpdate (markup) {
    this.setState({ previewedMarkup: marked(markup), editorMarkup:markup });
  }


  render () {

    return (
      <div className="splitDiv">
              <Markup className = "editor" initialValue={this.state.editorMarkup} onChange={this.handleStateUpdate}/>
              {/* Markup is called to update the editorMarkup */}
              <PreviewedMarkup previewedMarkup ={this.state.previewedMarkup} />
              {/* PreviewedMarkup is called to update the markup displayed in previewer */}
      </div>
    );
  }

};

class Markup extends React.Component {

   updateState = () => {
     this.props.onChange(this.refs.markup.value); {/* function to handle change of editor */}
  }

  render () {
    return (
        <textarea id="editor" ref="markup" value={this.props.initialValue} onInput={this.updateState}> </textarea>
    );
  }
};


class PreviewedMarkup extends React.Component {

  render () {

   let interpretedText = {__html:this.props.previewedMarkup};

    return (
      <div id="preview" dangerouslySetInnerHTML={interpretedText}></div>
      // This is what is called to do the actual conversion
    );
  }
};
// Below is the demonstration code to show how the app is used. It is what is loaded initially.
var editorMarkup = `# Welcome to my Github style markdown previewer!

## 2 hashes is an h2 heading
### 3 hashes is an h3 heading

To show code, \`<div></div>\`, put it between 2 backticks.

Here's more code between backticks:

\`\`\`

// this is multi-line code:

class CrazyCoder extends React.Component {
  if (crazyCoder === 'wackaDoodle') {
    return 'definitelyHire';
  }
}

\`\`\`

You can **bold** text by enclosing it with 2 asterisks on either side.

Or _italicize_ it by enclosing it with underscores.

You can even do **_both!_**

If you enclose words with that weird squiggly tilde symbol you can ~~cross stuff out~~.

There's also [links,](https://www.freecodecamp.com)

and....

> Block Quotes!

If you are feeling tabular there are tables:

One-ah Header | Two-ah Header | Three-ah Header
------- | -------- | -------

Your content can | be here, and it | can be here....
More             | And more        | And much much more.

- There are lists.
  - Some bulleted.
     - With different indentation levels,
        - That look like this.


1. There are numbererd lists too.
1. Health
1. Happiness
1. Money
1. All of the above...
9. It doesn't care if you use
5. non-sequential numbers or repeated numbers

![React Logo w/ Text](src\\trademark.png)
`;

// For some reason I can't get local images to work. Works on codepen with a remote link.

// Allows line breaks using return key
marked.setOptions({
  breaks: true
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);

export default App
