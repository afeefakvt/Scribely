import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Pagination } from "@mui/material";
import { getBlogs } from "../../api/blogApi";
import { Blog } from "../../interfaces/interface";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getBlogs();
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
        {currentBlogs.map((blog) => (
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {blog.content}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  By {blog.author.name} •{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default Home;
