import React, { useEffect, useState } from "react";
import BaseApp from "../BaseApp/baseApp";
import { useParams } from "react-router-dom";
import { AppState } from "../Context/AppProvider";
import { useNavigate } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function CommentPage() {
  const { userId, postId } = useParams();
  const navigate = useNavigate();

  const { post, comments, user, userProfile } = AppState();

  const [postAuthorData, setPostAuthorData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [postComments, setPostComments] = useState(null);
  const [commentData, setCommentData] = useState("");
  const [commentId, setCommentId] = useState(501);

  const [commentInputError, setCommentInputError] = useState(false);
  const [editCommentInputError, setEditCommentInputError] = useState(false);

  const [editCommentData, setEditCommentData] = useState(null);
  const [editCommentBodyData, setEditCommentBodyData] = useState("");
  const [editCommentIndexData, setEditCommentIndexData] = useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getData = () => {
      const postAuthorData = user.find((val) => val.id == userId);
      setPostAuthorData(postAuthorData);
      const postData = post.find((val) => val.id == postId);
      setPostData(postData);
      const postComments = comments.filter((val) => val.postId == postId);
      setPostComments(postComments);
    };
    getData();
  }, []);

  // Function to create new comment
  const createComment = async () => {
    try {
      if (commentData == "") {
        setCommentInputError(true);
      } else {
        setCommentId(commentId + 1);
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const time = new Date();
        const data = {
          body: commentData,
          postId,
          name: userProfile.name,
          commentId,
          createdAt: `${
            months[time.getMonth()]
          } ${time.getDate()} ${time.getHours()}:${time.getMinutes()}`,
        };

        const response = await axios.post(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
          data
        );
        setPostComments([response.data, ...postComments]);
        setCommentData("");
        setCommentInputError(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to delete comment
  const deleteComment = async (index, postCommentId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/comments/${postCommentId}`
      );
      postComments.splice(index, 1);
      setPostComments([...postComments]);
    } catch (error) {
      console.log(error);
    }
  };

  const editCommentStart = (index) => {
    setEditCommentData(postComments[index]);
    setEditCommentBodyData(postComments[index].body);
    setEditCommentIndexData(index);
    handleClickOpen();
  };

  // Function to edit comment
  //  In a PUT request, an error will be thrown because the comment ID is above 500. The jsonplaceholder API can edit comments already present in the API, but since we are editing a new comment, it will throw an error.
  const editComment = async () => {
    try {
      if (editCommentBodyData == "") {
        setEditCommentInputError(true);
      } else {
        const finalEditedData = postComments[editCommentIndexData];
        finalEditedData.body = editCommentBodyData;
        handleClose();
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/comments/${editCommentData.commentId}`,
          finalEditedData
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseApp>
      <div className="container">
        <div className="row justify-content-center">
          {postComments && (
            <div className="col-10">
              <div className="post-main-content">
                <div className="d-flex justify-content-between">
                  <div className="post-header">
                    <AccountCircleIcon fontSize="large" />
                    <p>{postAuthorData.name}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <IconButton
                      aria-label="KeyboardBackspaceIcon"
                      color="primary"
                    >
                      <KeyboardBackspaceIcon
                        onClick={() => navigate("/home")}
                        fontSize="large"
                      />
                    </IconButton>{" "}
                  </div>
                </div>

                <h3>{postData.title}</h3>
                <p>{postData.body}</p>
                {commentInputError ? (
                  <p style={{ color: "red", padding: "0", margin: "0" }}>
                    No Comments writen,please write comment
                  </p>
                ) : (
                  ""
                )}
                <TextField
                  id="filled-multiline-static"
                  label="Add a comment..."
                  multiline
                  value={commentData}
                  onChange={(e) => setCommentData(e.target.value)}
                  margin="normal"
                  rows={4}
                  fullWidth
                  variant="filled"
                />
                <div className="comment-btn">
                  <Button variant="contained" onClick={() => createComment()}>
                    Add comment
                  </Button>
                </div>
              </div>

              {postComments &&
                postComments.map((val, index) => {
                  return (
                    <div key={index} className="comment-box-container">
                      <div className="comment-box">
                        <AccountCircleIcon fontSize="large" />
                        <div>
                          <div className="comment-author-name-container">
                            <p className="">{val.name}</p>
                            {val.name == "jayasuriya" ? (
                              <p>{val.createdAt}</p>
                            ) : (
                              ""
                            )}
                          </div>

                          <p className="m-0 p-0">{val.body}</p>
                        </div>
                      </div>
                      {val.name == "jayasuriya" ? (
                        <div className="comment-box-btn-container">
                          <IconButton aria-label="delete">
                            <DeleteIcon
                              onClick={() =>
                                deleteComment(index, val.commentId)
                              }
                            />
                          </IconButton>
                          <IconButton aria-label="delete">
                            <EditIcon onClick={() => editCommentStart(index)} />
                          </IconButton>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          {editCommentInputError ? (
            <p style={{ color: "red", padding: "0", margin: "0" }}>
              No Comments writen,please write comment
            </p>
          ) : (
            ""
          )}
          <TextField
            id="filled-multiline-static"
            label="Edit a comment..."
            multiline
            value={editCommentBodyData}
            onChange={(e) => setEditCommentBodyData(e.target.value)}
            margin="normal"
            rows={4}
            fullWidth
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => editComment()}>Update</Button>
        </DialogActions>
      </Dialog>
    </BaseApp>
  );
}
