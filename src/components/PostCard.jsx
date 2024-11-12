import React from "react";
import { useState } from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, description }) {
  const [user, setUser] = useState();
  const [date, setDate] = useState()
  authService.getCurrentUser($id).then((user) => {
    setUser(user.name)
  })
  
  
  return (
    <Link to={`/post/${$id}`}>
      
      <div className="flex flex-col w-full md:w-fit bg-orange-100 shadow-2xl text-orange-950 rounded-xl">
      <div className="flex">
      
      <div></div>
      </div>
        <div className="mb-4 w-full">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full mx-auto rounded-t-xl"
          />
        </div>
        <div>
        <h2 className="text-3xl text-center font-bold mb-2  mx-4">{title}</h2>
        </div>
        <div className="bg-orange-900 h-[0.5px] shadow-2xl mx-4 mb-2">

        </div>
        <div>
          <h3 className="text-center mb-2 mx-4">{description}</h3>
        </div>
        <div className="ml-6 text-sm mb-2 text-orange-900">Written by : {user}</div>
      </div>
    </Link>
  );
}

export default PostCard;
