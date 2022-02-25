/* eslint-disable jsx-a11y/alt-text */
import "./Style.css";
import ProfilePic from "../assets/pp.jpeg";

const Post = (props) => {
  return (
    <div className="Post">
      <div className="Post-Profile-Details-Container">
        <div className="Post-Profile-Details-Inside-Container">
          <div className="Post-Profile-Details-Inside-Image-Container">
            <img src={ProfilePic} width="100%"></img>
          </div>
          <div className="Post-Profile-Details-Inside-Name-Container">
            <p>Chad Meister</p>
          </div>
        </div>
      </div>
      <div className="Post-Text-Container">
        <p>{props.text}</p>
      </div>
      <div className="Post-Gif-Container">
        <img
          width="100%"
        src={props.gif}
        ></img>
      </div>
      <div className="Post-Button-Container"></div>
    </div>
  );
};

export default Post;
