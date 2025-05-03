import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getBlogById, updateBlog } from "../../api/blogApi";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box
} from "@mui/material";

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!token || !id) return;
        const res = await getBlogById(id);
        setTitle(res.blog.title);
        setContent(res.blog.content);
        setImageUrl(res.blog.imageUrl);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error loading blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, token]);

  const handleUpdate = async () => {
    try {
      if (!token || !id) return;
      const formData = new FormData()
      formData.append("title",title)
      formData.append("content",content)
      if(newImageFile){
        formData.append("image",newImageFile)
      }
      await updateBlog(id,formData);
      navigate("/myfeed");
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container sx={{ mt: 12 }}>
      <Typography variant="h5" gutterBottom>
        Edit Blog
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Content"
        multiline
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Box mt={2}>
        <Typography variant="subtitle1">Current Image:</Typography>
        {imageUrl && (
          <Box mb={2}>
            <img
              src={imageUrl}
              alt="Current"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Box>
        )}
        <Button variant="outlined" component="label">
          Upload New Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setNewImageFile(e.target.files[0]);
                setImageUrl(URL.createObjectURL(e.target.files[0])); // Preview new image
              }
            }}
          />
        </Button>
      </Box>

      <Button variant="contained" onClick={handleUpdate} sx={{ mt: 2, mr: 2 }}>
        Update
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => navigate("/myfeed")}
        sx={{ mt: 2 }}
      >
        Cancel
      </Button>
    </Container>
  );
};

export default EditBlog;
