import React, { useEffect } from "react";
import BaseApp from "../BaseApp/baseApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { AppState } from "../Context/AppProvider";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Home() {
  const { post, setPost, comments, setComments, user, setUser } = AppState();

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const userResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      setUser(userResponse.data);

      const postResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      setPost(postResponse.data);

      const commentsResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/comments`
      );
      setComments(commentsResponse.data);
    };
    getData();
  }, []);
  return (
    <BaseApp>
      <div className="container">
        <div className="row justify-content-center">
          {user &&
            comments &&
            post &&
            post.map((data, index) => {
              const postAuthorData = user.find((val) => data.userId == val.id);
              const postCommentsData = comments.filter(
                (val) => val.postId == data.id
              );
              return (
                <div key={index} className="col-10 post-container">
                  <div className="post-header">
                    <AccountCircleIcon fontSize="large" />
                    <p>{postAuthorData.name}</p>
                  </div>
                  <h3>{data.title}</h3>
                  <p>{data.body}</p>

                  <div
                    className="post-comment-btn-container"
                    onClick={() =>
                      navigate(`/post/comment/${data.userId}/${data.id}`)
                    }
                  >
                    <div className="post-comment-btn">
                      <ChatBubbleOutlineIcon /> <p>{postCommentsData.length}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </BaseApp>
  );
}
