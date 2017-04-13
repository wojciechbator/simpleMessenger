import React, { Component } from 'react'
import CommentsList from "./CommentsList"
import {connect} from "react-redux"

import styles from '../styles/styles'
import {refreshComments, saveComment} from "../../redux/comments/commentsActions"

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
    this.submitComment = this.submitComment.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateBody = this.updateBody.bind(this);
  }

  componentDidMount() {
    if (this.props.status !== 'loaded') {
      this.props.dispatch(refreshComments());
      this.setState({
        comments: this.props.comments
      })
    }
  }

  submitComment(e) {
    e.preventDefault();
    const author = this.state.comment.author;
    const content = this.state.comment.content;
    const timestamp = (new Date()).getTime();
    this.props.dispatch(saveComment(author, content, timestamp));
    this.setState({
      comments: this.props.comments
    });
  }

  updateUsername(event) {
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['author'] = event.target.value;
    this.setState({
      comment: updatedComment
    });
  }

  updateBody(event) {
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['content'] = event.target.value;
    this.setState({
      comment: updatedComment
    });
  }

  render() {
    return (
      <div style={styles.comment.commentsBox}>
          <h1>Komentarze:</h1>
          { this.props.comments.length === 0
            ? <p>Bądź pierwszym, który skomentuje!</p>
            : <CommentsList comments={this.props.comments}/>}
        <form onSubmit={this.submitComment}>
          <h1>Skomentuj</h1>
          <input onChange={this.updateUsername} type="text"/>
          <textarea onChange={this.updateBody} type="text"/>
          <input type="submit" value="odpowiedz"/>
        </form>
      </div>
    );
  };
}

CommentsContainer.propTypes = {
  status: React.PropTypes.string,
  comment: React.PropTypes.object,
  comments: React.PropTypes.array
};

const mapStateToProps = (store) => {
  return {
    status: store.comments.status,
    comments: store.comments.data
  };
};

export default connect(mapStateToProps)(CommentsContainer);