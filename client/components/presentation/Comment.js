import React, { Component } from 'react'
import styles from '../styles/styles'

class Comment extends Component {
    render() {
        return(
            <div>
                <p style={{fontSize: 20, fontWeight:400}}>
                    {this.props.currentComment.body}
                </p>
                <span style={styles.comment.nameAndDate}>{this.props.currentComment.username}</span>
                <span style={styles.comment.pipeStyle}>|</span>
                <span style={styles.comment.nameAndDate}>{this.props.currentComment.timestamp}</span>
                <hr />
            </div>
        )
    }
}

export default Comment