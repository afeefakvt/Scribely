import { useState,ChangeEvent,FormEvent, useEffect } from "react"
import { LoginData } from "../../interfaces/interface"
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
import {  Link as RouterLink } from 'react-router-dom';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { login } from "../../api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { validateLoginForm } from "../../utils/validations";

const Login = () => {
    const [loginData,setLoginData] = useState<LoginData>({
        email:"",
        password:""
    })

    const [error,setError] = useState<string>("")
    const [success,setSuccess] = useState<string>("")
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const token = useSelector((state:RootState)=>state.auth.token)
    const [formErrors, setFormErrors] = useState<{ email?: string, password?: string }>({})



    useEffect(()=>{
      if(token){
        navigate('/',{replace:true})
      }
    },[token,navigate])

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        setLoginData({
            ...loginData,
            [e.target.name]:e.target.value
        })

    }
    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setError('')
        setSuccess('')
        const errors  = validateLoginForm(loginData.email,loginData.password);
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
          return;
      }
        try {
            await login(loginData);
            setSuccess('Login Success')
            setTimeout(()=>{
                navigate('/')
            },1500)
        } catch (error:any) {
            setError(error.message)
        }
    }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 20 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleChange}
            margin="normal"
            required
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={loginData.password}
            onChange={handleChange}
            margin="normal"
            required
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don't have an account?{' '}
          <Link component={RouterLink} to="/register">
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Container>
  )
}

export default Login
