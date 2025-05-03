import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, CardMedia, Container, CircularProgress, Alert } from "@mui/material";
import { getBlogs } from "../../api/blogApi";
import { Blog } from "../../interfaces/interface";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getBlogs()        
        setBlogs(res.blogs);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container sx={{ mt: 17 }}>
      {/* <Typography variant="h5" gutterBottom>
        Latest Blogs
      </Typography> */}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {blogs.map((blog) => (
          <Link to={`/blogs/${blog._id}`} style={{ textDecoration: "none" }}>
          <Card key={blog._id} sx={{ width: 300 }}>
            {blog.imageUrl && (
              <CardMedia
                component="img"
                height="140"
                image={blog.imageUrl}
                alt={blog.title}
              />
            )}
            <CardContent>
              <Typography variant="h6">{blog.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {blog.content.slice(0, 100)}...
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                By {blog.author.name} • {new Date(blog.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
          </Link>
        ))}
      </Box>
    </Container>
  );
};

export default Home;

