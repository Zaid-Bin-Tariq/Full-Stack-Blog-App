import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="ml-24 py-8 text-orange-950">
      <Container>
        <div className="w-3/4 mt-4 flex flex-col mb-16 ml-[-100px] relative">
          <div className="flex items-center mb-6 justify-between mx-2">
            <div>
              <h1 className="text-4xl font-bold">{post.title}</h1>
            </div>
            <div>
            {isAuthor && (
              <div className="text-xs">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-800" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-800" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
            </div>
          </div>
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="border-2 border-orange-950 w-full"
          />
        </div>
        <div><h2 className="text-3xl mb-6 font-bold">{post.description}</h2></div>

        <div className="w-2/3 browser-css mb-8">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
