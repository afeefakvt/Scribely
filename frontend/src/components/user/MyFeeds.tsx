import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deleteBlog } from "../../api/blogApi";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Pagination } from "@mui/material";
import { Blog } from "../../interfaces/interface";
import { getMyBlogs } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const MyFeed = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        if (!token) return;
        const res = await getMyBlogs();
        setBlogs(res.blogs);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error fetching your blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlogs();
  }, [token]);

  const handleEdit = (blogId: string) => {
    navigate(`/edit/${blogId}`);
  };

  const handleOpenDialog = (blogId: string) => {
    setSelectedBlogId(blogId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBlogId(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container sx={{ mt: 17 }}>
      {/* <Typography variant="h5" gutterBottom>
        My Feed
      </Typography> */}
      {blogs.length === 0 ? (
        <Typography>No blogs posted yet.</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
          {currentBlogs.map((blog) => (
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
                <Box mt={2} display="flex" justifyContent="space-between">
                  <button
                    style={{
                      background: "orange",
                      border: "none",
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(blog._id)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      background: "#d12b39",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpenDialog(blog._id)}
                  >
                    Delete
                  </button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this blog?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={async () => {
              if (selectedBlogId) {
                try {
                  await deleteBlog(selectedBlogId);
                  setBlogs((prev) =>
                    prev.filter((blog) => blog._id !== selectedBlogId)
                  );
                  handleCloseDialog();
                } catch (err: any) {
                  setError(
                    err.response?.data?.message || "Failed to delete blog"
                  );
                  handleCloseDialog();
                }
              }
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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

export default MyFeed;
