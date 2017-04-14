import React, {Component} from "react";
import CommentsList from "./CommentsList";
import styles from "../styles/styles";
import {Button, Comment, Form, Header} from "semantic-ui-react";
import {connect} from "react-redux";
import {refreshComments, saveComment} from "../../redux/comments/commentsActions";

require('../../../node_modules/semantic-ui/dist/components/form.min.css');
require('../../../node_modules/semantic-ui/dist/components/button.min.css');
require('../../../node_modules/semantic-ui/dist/components/header.min.css');
require('../../../node_modules/semantic-ui/dist/components/comment.min.css');

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
        <Comment.Group>
          <Header as="h3">Komentarze: </Header>
          { this.props.comments.length === 0
            ? <p>Bądź pierwszym, który skomentuje!</p>
            : <CommentsList comments={this.props.comments}/>}
        </Comment.Group>
        <Form reply onSubmit={this.submitComment}>
          <Header as="h3">Skomentuj</Header>
          <Form.Input fluid onChange={this.updateUsername} type="text"/>
          <Form.TextArea autoHeight onChange={this.updateBody} type="text"/>
          <Button type="submit" content='Odpowiedz' color="green"/>
        </Form>
      </div>
    );
  };
}

CommentsContainer.propTypes = {
  status: React.PropTypes.string,
  comment: React.PropTypes.object,
  comments: React.PropTypes.shape({
    confirmation: React.PropTypes.string.isRequired,
    message: React.PropTypes.string,
    result: React.PropTypes.array
  })
};

const mapStateToProps = (store) => {
  return {
    status: store.comments.status,
    comments: store.comments.data
  };
};

export default connect(mapStateToProps)(CommentsContainer);