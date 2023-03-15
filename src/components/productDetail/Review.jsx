import React,{memo} from "react";
import { Button, Comment, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import HalfRatingRead from "../../common/rating/HalfRatingRead";
const Review = ({ listReview, handleClick }) => {
  return (
    <Comment.Group>
      {listReview.map((item, index) => {
        return (
          <Comment key={index}>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            <Comment.Content>
              <Comment.Author as="a">{item.userName}</Comment.Author>
              <Comment.Metadata>
                <div>{item.reviewAt}</div>
              </Comment.Metadata>
              <Comment.Text>
                <HalfRatingRead value={item.ratingPoint} />
              </Comment.Text>
              <Comment.Text>{item.content}</Comment.Text>
            </Comment.Content>
          </Comment>
        );
      })}

      <Form reply>
        <Button
          onClick={handleClick}
          content="Đánh giá"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    </Comment.Group>
  );
};
export default memo(Review);
