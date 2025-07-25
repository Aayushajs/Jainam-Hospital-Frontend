import axios from "axios";
import React, { useContext, useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Context } from "../Context/context.jsx";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { 
  Box, 
  Button, 
  Container, 
  CssBaseline, 
  Grid, 
  Paper, 
  TextField, 
  Typography,
  FormControlLabel,
  Checkbox,
  Avatar,
  Skeleton
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigateTo = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    // Show skeleton for 2 seconds when component mounts
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(
        "https://jainam-hospital-backend.onrender.com/api/v1/user/login",
        { email, password, confirmPassword, role: "Patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      
      // Store user data and token
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 17,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {initialLoading ? (
            <>
              <Skeleton variant="circular" width={40} height={40} sx={{ m: 1 }} />
              <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width={120} height={36} sx={{ mb: 2 }} />
            </>
          ) : (
            <>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }} ref={formRef}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      value="remember" 
                      color="primary" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/forgot-password" variant="body2" style={{ textDecoration: 'none' }}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register" variant="body2" style={{ textDecoration: 'none' }}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Box>
        <Box mt={8}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            <Link color="inherit" to="/" style={{ textDecoration: 'none' }}>
              Jainam Medical Institute
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;