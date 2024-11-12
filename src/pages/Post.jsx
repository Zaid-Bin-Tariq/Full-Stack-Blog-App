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
    <div className="py-8 text-orange-950">
      <Container>
        <div className="w-full md:w-3/4 md:mt-4 mt-2 flex flex-col mb-6 relative">
          <h1 className="text-4xl font-bold mb-3 ml-0">{post.title}</h1>

          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="md:border-2 border-orange-950 w-full mb-2"
          />
          <div className="md:w-3/4 md:mx-auto">
            <h2 className="text-3xl mb-2 font-bold ">{post.description}</h2>
            <div className="w-full browser-css mb-8">{parse(post.content)}</div>
          </div>
        </div>
        <div className="mb-0">
          {isAuthor && (
            <div>
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-800" className="mr-1 md:mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-800" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}
