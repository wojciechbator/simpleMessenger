import React, {Component} from "react";
import styles from "../styles/styles";
import Comment from "../presentation/Comment";

class CommentsList extends Component {
  render() {
    return (
      <ul style={styles.comment.commentsList}>
        {this.props.comments.map((comment, i) => {
          return (
            <li key={i}>
              <Comment currentComment={comment}/>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default CommentsList