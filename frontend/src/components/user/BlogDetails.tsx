import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Typography, CardMedia, CircularProgress, Alert } from "@mui/material";
import { getBlogById } from "../../api/blogApi"; // You’ll create this API function
import { Blog } from "../../interfaces/interface";



const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id!);
        setBlog(res.blog);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!blog) return null;

  return (
    <Container sx={{ mt: 18 }}>
      {blog.imageUrl && (
        <CardMedia
          component="img"
          height="300"
          image={blog.imageUrl}
          alt={blog.title}
          sx={{ mb: 2, borderRadius: 2 }}
        />
      )}
      <Typography variant="h4" gutterBottom>{blog.title}</Typography>
      <Typography variant="subtitle2" gutterBottom>
        By {blog.author.name} • {new Date(blog.createdAt).toLocaleDateString()}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {blog.content}
      </Typography>
    </Container>
  );
};

export default BlogDetails;
