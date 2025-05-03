import {useState,ChangeEvent,FormEvent} from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
    Alert,
    Link
  } from '@mui/material';
import { IUser } from "../../interfaces/interface";
import {Link as RouterLink} from 'react-router-dom'
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { register } from "../../api/userApi";
import { useNavigate } from "react-router-dom";


const Register = ()=>{
    const [formData,setFormData] =useState<IUser>({
        name:'',
        email:"",
        password:"",
        confirmPassword:""
    });

    const [error,setError] = useState<string>('');
    const [success,setSuccess] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };
  
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit =async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setError('')
        setSuccess('')
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
          }
        try {
            await register(formData)
            setSuccess("Registration Successfull")
            setTimeout(()=>{
                navigate('/login')
            },1500)
        } catch (error:any) {
            setError(error.response?.data?.message || "registration failed")
            
        }
    }

    return(
        <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 20 }}>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
  
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
  
          <Box component="form" onSubmit={handleSubmit} noValidate >
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}

            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Register
            </Button>
          </Box>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login">
            Sign In
          </Link>
        </Typography>
        </Paper>
      </Container>
    )

}

export default Register