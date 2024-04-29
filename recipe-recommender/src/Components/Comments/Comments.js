import React, { useState } from "react";
import "../Comments/Comments.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarRating from "../Middle/StarRating";

const Comments = ({ cmt }) => {
  const [booleonLike, setBooleonLike] = useState(false);
  const [likeCount, setLikeCount] = useState(cmt.likes);
  console.log(cmt);
  const getCommentName = (cmt) => {
    if (cmt.user.username) {
        return cmt.user.username;
    }
    return cmt.user
  };
  return (
    <div className="overAllCommentList">
      <div className="commentList">
        <div className="commentList1">
          <div className="commentHead">
            {/* <div><img src={cmt.profilePic} /></div> */}
            <p></p>
            <p>
              <span>{getCommentName(cmt)}</span>
              {cmt.comment}
              <span></span>
            </p>
          </div>

          <div className="commentFooter">
            {/* <p>{cmt.datetime}</p>
                    <h4>{booleonLike ? likeCount +1 : likeCount} likes</h4> */}
          </div>
        </div>

        <div className="commentList2">
          {/* <p
            className='cp'
            onClick={()=>setBooleonLike(!booleonLike)}
            style={{cursor:"pointer"}}
            >
                {booleonLike ? <FavoriteRoundedIcon /> : <FavoriteBorderOutlinedIcon />}
            </p> */}
          <div className="star">
            <StarRating currentRating={cmt.score} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
