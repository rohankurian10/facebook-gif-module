/* eslint-disable jsx-a11y/alt-text */
import "./Style.css";
import ProfilePic from "../assets/pp.jpeg";
import Aa from "../assets/Aa.png";
import { useState } from "react";
import axios from "axios";

const PostComposer = (props) => {
  const trendingGifUrl =
    "https://api.giphy.com/v1/gifs/trending?api_key=1SZvqaO17Lup2gMfDQoUxiibtOWyHmUU&limit=10";
  const searchGifUrl =
    "https://api.giphy.com/v1/gifs/search?api_key=1SZvqaO17Lup2gMfDQoUxiibtOWyHmUU&limit=10&q=";

  const [btn, setBtn] = useState(true);
  const [gifModal, setGifModal] = useState(false);

  const [gif, setGif] = useState([]);
  const [selectedGif, setSelectedGif] = useState(false);
  // const [feed, setFeed] = useState([]);

  let gifClick = () => {
    setGifModal(true);
    document.getElementById("title").innerHTML = "Choose a GIF";
    axios
      .get(trendingGifUrl)
      .then((response) => {
        setGif(response.data.data);
        console.log(gif.images.fixed_width.url);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let gifSearch = (e) => {
    axios
      .get(searchGifUrl + e.target.value)
      .then((response) => {
        setGif(response.data.data);
        console.log(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let postHandler = () => {
    let postText = document.getElementById("post").value;
    props.feedList({ postcontent: postText, gif: selectedGif });
    props.modal();
    console.log(props.feed);
  };

  return (
    <div className="PostComposer">
      <div className="PostComposer-Main-Title-Container">
        <div className="PostComposer-Main-Title-Container-Title-Container">
          <div className="PostComposer-Main-Title-Container-Title-Container-Button">
            <div
              className={!gifModal && "hidden"}
              onClick={() => {
                setGifModal(false);
                document.getElementById("title").innerHTML = "Create Post";
              }}
            >
              <i className="arrow" data-visualcompletion="css-img"></i>
            </div>
            <h2 id="title">Create post</h2>
            <div
              className={gifModal && "hidden"}
              onClick={() => {
                props.modal();
              }}
            >
              <i className="cross" data-visualcompletion="css-img"></i>
            </div>
          </div>
        </div>
      </div>
      {!gifModal && (
        <div className="PostComposer-Centered-Container">
          <div className="PostComposer-Centered-Container-Name-Container">
            <div className="PostComposer-Centered-Container-Name-Container-Image-Container">
              <img src={ProfilePic} height="100%" />
            </div>
            <div className="PostComposer-Centered-Container-Name-Container-Name-Container">
              <p>Chad Meister</p>
              <div className="PostComposer-Centered-Container-Name-Container-Name-Container-Button">
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/Xo4MOKfqR38.png"
                  alt="Only me"
                  height="12"
                  width="12"
                ></img>
                Only Me
                <i
                  data-visualcompletion="css-img"
                  className="PostComposer-Centered-Container-Name-Container-Name-Container-Button-Caret"
                ></i>
              </div>
            </div>
          </div>
          <div className="PostComposer-Centered-Container-Input-Container">
            <input
              onChange={(e) => {
                if (e.target.value !== "") {
                  setBtn(false);
                } else {
                  setBtn(true);
                }
              }}
              placeholder="What's on your mind, Chad?"
              id="post"
            ></input>
          </div>
          <div className="PostComposer-Centered-Container-Gif-Container">
            {selectedGif && <img src={selectedGif} width="100%"></img>}
          </div>
          <div className="PostComposer-Centered-Container-Emoji-Aa-Container">
            <img style={{ cursor: "pointer" }} src={Aa} height="80%" />
            <i data-visualcompletion="css-img" className="emoji"></i>
          </div>
          <div className="PostComposer-Centered-Container-Icon-Container">
            <div className="PostComposer-Centered-Container-Icon-Container-Icons">
              <p>Add to your post</p>
              <div className="PostComposer-Centered-Container-Icon-Container-Icons-Container">
                <div className="icons-container">
                  <div className="icon-container-round" onClick={gifClick}>
                    <i data-visualcompletion="css-img" className="icon-gif"></i>
                  </div>
                  <div className="icon-container-round">
                    <i
                      data-visualcompletion="css-img"
                      className="icon-photo"
                    ></i>
                  </div>
                  <div className="icon-container-round">
                    <i data-visualcompletion="css-img" className="icon-tag"></i>
                  </div>
                  {/* <div className="icon-container-round">
                  <i
                    data-visualcompletion="css-img"
                    className="icon-smiley"
                  ></i>
                </div> */}
                  <div className="icon-container-round">
                    <i data-visualcompletion="css-img" className="icon-gps"></i>
                  </div>
                  <div className="icon-container-round">
                    <i data-visualcompletion="css-img" className="icon-mic"></i>
                  </div>
                  <div className="icon-container-round">
                    <i
                      data-visualcompletion="css-img"
                      className="three-dots"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={postHandler} disabled={btn} className="Post-Button">
            Post
          </button>
        </div>
      )}
      {gifModal && (
        <div className="PostComposer-Gif-Container">
          <div className="PostComposer-Gif-Container-Input-Container">
            <input
              placeholder="Search"
              onChange={gifSearch}
              // onClick={() => console.log(gif, selectedGif)}
            ></input>
          </div>
          <div className="PostComposer-Gif-Preview-Container">
            {gif.map((gif, index) => (
              <div style={{ borderRadius: "1rem" }} key={gif.id}>
                <img
                  width="100%"
                  src={gif.images.downsized_medium.url}
                  alt="gif"
                  onClick={() => {
                    setSelectedGif(gif.images.downsized_medium.url);
                    setGifModal(!gifModal);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostComposer;
