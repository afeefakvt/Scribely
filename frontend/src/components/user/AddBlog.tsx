import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { publishBlog } from "../../api/blogApi";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?._id

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault()
    setError('')

    const formData = new FormData();
    formData.append("title",title)
    formData.append("content",content)
    if(image){
        formData.append("image",image)
    }
    if(userId){
        formData.append("author",userId)
    }else{
        console.error("user id missing")
        setError("User is required")
        return;
    }
    try {
        await publishBlog(formData)
        setSuccess("Blog added successfully");
        setTimeout(()=>{
            navigate('/')
        },1500)
    } catch (error) {
        console.error("Failed to add blog", error);
        
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 18 }}>
      <Typography variant="h5" gutterBottom>
        Publish New Blog
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Content"
          fullWidth
          margin="normal"
          multiline
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button variant="contained" component="label" sx={{ my: 2 }}>
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </Button>
        {image && <Typography>{image.name}</Typography>}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Blog"}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddBlog;
