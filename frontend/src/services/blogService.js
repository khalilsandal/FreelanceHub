import blogs from "../data/blogs.json";
import axios from "axios";

export const getBlogs = async () => {
  const response = await axios.get("/api/blogs");
  return response.data;
};

export const getBlogById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const blog = blogs.find(
    (blog) => blog.id === Number(id)
  );

  if (!blog) {
    throw new Error("Blog not found");
  }

  return blog;
};

export const getFeaturedBlog = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return blogs.find((blog) => blog.featured);
};

export const getBlogsByCategory = async (category) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return blogs.filter(
    (blog) => blog.category === category
  );
};