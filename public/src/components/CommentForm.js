var React = require('react');
var CommentForm = React.createClass({
  getInitialState: function() {
    return {
      author: '',
      text: ''
    };
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({author: author, text: text});
    this.setState({text:''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          className="commentName"
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <section className="commentSend">
          <input
            type="text"
            placeholder="Type a message..."
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <button type="submit"><img src="../../vectors/ic_send_white_24px.svg"></img></button>
        </section>
      </form>
    );
  }
});

module.exports = CommentForm;
