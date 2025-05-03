import { AppBar, Toolbar, Typography, Button, Box, IconButton,Avatar,Menu,MenuItem,
    Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store,persistor, } from '../../store/store';
import React, { useEffect, useState } from 'react';
import { logout } from '../../store/userSlice';
import storage from 'redux-persist/lib/storage';
import { useNavigate,Link } from 'react-router-dom';
import { logoutUser } from '../../api/userApi';


const Navbar = () => {

    const token = useSelector((state:RootState)=>state.auth.token)
    const user =  useSelector((state:RootState)=>state.auth.user)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false)
    const dispatch= useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        console.log("current redux state",store.getState());
        
    })

    const handleMenuOpen = (event:React.MouseEvent<HTMLElement>)=>{
        setAnchorEl(event.currentTarget)
    }
    const handleMenuClose = ()=>{
        setAnchorEl(null)
    }
    const handleLogout = ()=>{
        setDialogOpen(true)
        handleMenuClose()
    }
    const handleDialogClose = ()=>{
        setDialogOpen(false)
    }

    const confirmLogout = async()=>{
        try {
            dispatch(logout())
            await persistor.flush(); //ensure persisted state is updated
            storage.removeItem('persist:auth');//clear persisted redux state
            await logoutUser()
            navigate('/login')

        } catch (error) {
            console.log(error)
            
        }finally{
            setDialogOpen(false)
        }
    }

  return (
    <AppBar >
      <Toolbar sx={{justifyContent:"space-between"}}>
        <IconButton component={RouterLink} to="/" edge="start" color="inherit" sx={{ mr: 0 }}>
          <MenuBookIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          SCRIBELY
        </Typography>

        {token ? (
          <Box>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar>
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >

              <MenuItem onClick={()=>{navigate('/');handleMenuClose()}}>Home</MenuItem>
              <MenuItem onClick={()=>{navigate('/addBlog');handleMenuClose()}}>Add Blog</MenuItem>
              <MenuItem onClick={()=>{navigate('/myFeed');handleMenuClose()}}>My feed</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
      <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                  >
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to log out?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDialogClose} variant="contained" color="primary" >
                        Cancel
                      </Button>
                      <Button onClick={confirmLogout} variant="contained" color="primary"  autoFocus>
                        Logout
                      </Button>
                    </DialogActions>
                  </Dialog>

    </AppBar>
  );
};

export default Navbar;
