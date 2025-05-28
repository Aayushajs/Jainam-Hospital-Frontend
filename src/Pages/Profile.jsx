import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import doctorAnimation from "../../public/Animaition/doctor-animation.json";
import doctorAnimation2 from "../../public/Animaition/doctor-animation1.json";

// Material-UI Imports
import {
    Container, Grid, Typography, Paper, Button, TextField, Box,
    Avatar,  useMediaQuery,
    MenuItem,  InputAdornment, Chip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Material-UI Icons Imports
import {
    Edit as EditIcon, Save as SaveIcon, Email as EmailIcon,
    Phone as PhoneIcon, Person as PersonIcon, VpnKey as NicIcon, // Using VpnKey for NIC
    Cake as DobIcon, Wc as GenderIcon, Cancel as CancelIcon // Using Wc for Gender
} from '@mui/icons-material';

// Framer Motion Import
import { motion } from 'framer-motion';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "", phone: "",
        nic: "", dob: "", gender: "",
    });
    const [loading, setLoading] = useState(true); // Added loading state

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Using MUI hook

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                "https://jainam-hospital-backend.onrender.com/api/v1/user/patient/me",
                { withCredentials: true }
            );
            setProfile(data.user);
            setFormData({
                firstName: data.user.firstName || "",
                lastName: data.user.lastName || "",
                email: data.user.email || "",
                phone: data.user.phone || "",
                nic: data.user.nic || "",
                dob: data.user.dob ? data.user.dob.split("T")[0] : "",
                gender: data.user.gender || "",
            });
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch profile", err);
            toast.error("Failed to load profile.");
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(
                "https://jainam-hospital-backend.onrender.com/api/v1/user/patient/update",
                formData,
                { withCredentials: true }
            );
            toast.success("Profile updated successfully!");
            setEditMode(false);
            fetchProfile(); // Refetch to show updated data
        } catch (err) {
            console.error("Update failed", err);
            toast.error(err.response?.data?.message || "Update failed. Please try again.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        fetchProfile();
    }, []);


    // --- Profile Not Found ---
    if (!profile) {
         return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', textAlign: 'center', p: 3 }}>
                <Lottie animationData={doctorAnimation2} loop style={{ width: 300, height: 300 }} />
                <Typography variant="h5" color="error.main" gutterBottom> Wait </Typography>
                <Typography variant="body1" color="text.secondary">We couldn't load your profile. Please try logging in again or contact support.</Typography>
                 <Button variant="contained" sx={{mt: 3}} onClick={() => window.location.reload()}>Try Again</Button>
            </Box>
        );
    }

    const ProfileField = ({ name, label, value, type = "text", icon, options = [] }) => (
        <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                label={label}
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                disabled={!editMode}
                variant="outlined" // Using Outlined variant
                select={type === "select"}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {icon}
                        </InputAdornment>
                    ),
                    readOnly: !editMode, // Make it visually distinct when not in edit mode
                }}
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '12px', // Rounded corners
                        backgroundColor: editMode ? 'white' : '#f9f9f9',
                    },
                     '& .Mui-disabled': {
                        WebkitTextFillColor: '#333 !important', // Ensure text is readable when disabled
                        color: '#333 !important',
                        cursor: 'default',
                         '& .MuiOutlinedInput-notchedOutline': {
                           borderColor: '#e0e0e0 !important' // Lighter border when disabled
                         }
                    }
                }}
            >
                {type === "select" && options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>
    );

    return (
        <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh', py: { xs: 2, md: 8 } }}>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="flex-start">

                    {/* Left Panel - Animation (Desktop Only) */}
                    {!isMobile && (
                        <Grid item md={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 6 }}>
                             <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Lottie animationData={doctorAnimation} loop style={{ width: '100%', maxWidth: 450  , marginLeft:400,}} />
                                <Typography variant="h4" sx={{ textAlign: 'center', mt: -4, fontWeight: 'bold', marginLeft:50 , color: 'primary.main' }}>
                                    Your Health, Our Care
                                </Typography>
                                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mt: 1 , marginLeft:50 ,}}>
                                    Manage your profile and stay updated with your health records.
                                </Typography>
                             </motion.div>
                        </Grid>
                    )}

                    {/* Right Panel - Profile Details */}
                    <Grid item xs={12} md={7}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Profile Header Card */}
                            <Paper
                                elevation={4}
                                sx={{
                                    p: 3, borderRadius: '20px', display: 'flex' ,
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    alignItems: 'center', gap: 3,
                                    background: 'linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)',
                                    boxShadow: '0 10px 25px -5px rgba(0, 123, 255, 0.1), 0 8px 10px -6px rgba(0, 123, 255, 0.1)',
                                    position: 'relative', overflow: 'hidden'
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: { xs: 80, sm: 100 }, height: { xs: 80, sm: 100 },
                                        bgcolor: 'primary.main', fontSize: '2.5rem',
                                        fontWeight: 'bold', border: '3px solid white',
                                        boxShadow: 3
                                    }}
                                >
                                    {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                                </Avatar>
                                <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                        {profile.firstName} {profile.lastName}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                                        {profile.email}
                                    </Typography>
                                    <Chip label={profile.role} color="primary" variant="outlined" size="small" />
                                </Box>
                                <Button
                                    variant={editMode ? "outlined" : "contained"}
                                    color={editMode ? "error" : "primary"}
                                    startIcon={editMode ? <CancelIcon /> : <EditIcon />}
                                    onClick={() => setEditMode(!editMode)}
                                    sx={{ borderRadius: '50px', px: 3, textTransform: 'none' }}
                                >
                                    {editMode ? 'Cancel Edit' : 'Edit Profile'}
                                </Button>
                            </Paper>

                            {/* Profile Information Form */}
                            <Paper elevation={4} sx={{ p: {xs: 2, sm: 4}, mt: 4, borderRadius: '20px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, borderBottom: '2px solid', borderColor: 'primary.light', pb: 1, display: 'inline-block' }}>
                                    Profile Information
                                </Typography>
                                <Grid container spacing={3}>
                                    <ProfileField name="firstName" label="First Name" value={formData.firstName} icon={<PersonIcon color="action"/>} />
                                    <ProfileField name="lastName" label="Last Name" value={formData.lastName} icon={<PersonIcon color="action"/>} />
                                    <ProfileField name="email" label="Email" value={formData.email} type="email" icon={<EmailIcon color="action"/>} />
                                    <ProfileField name="phone" label="Phone" value={formData.phone} type="tel" icon={<PhoneIcon color="action"/>} />
                                    <ProfileField name="nic" label="NIC / Aadhar" value={formData.nic} icon={<NicIcon color="action"/>} />
                                    <ProfileField name="dob" label="Date of Birth" value={formData.dob} type="date" icon={<DobIcon color="action"/>} />
                                    <ProfileField
                                        name="gender" label="Gender" value={formData.gender} type="select" icon={<GenderIcon color="action"/>}
                                        options={[
                                            { value: "Male", label: "Male" },
                                            { value: "Female", label: "Female" },
                                            { value: "Other", label: "Other" },
                                        ]}
                                    />

                                    {editMode && (
                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="large"
                                                startIcon={<SaveIcon />}
                                                onClick={handleUpdate}
                                                sx={{ borderRadius: '50px', px: 4, fontWeight: 'bold' }}
                                            >
                                                Save Changes
                                            </Button>
                                        </Grid>
                                    )}
                                </Grid>
                            </Paper>

                           {/* Terms Box */}
                            <Paper elevation={0} sx={{
                                mt: 4, p: 3, borderRadius: '16px',
                                bgcolor: 'info.light', color: 'info.darker',
                                borderLeft: '5px solid', borderColor: 'info.main'
                             }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Terms & Conditions</Typography>
                                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                                    By using this portal, you agree to our privacy policy and terms of service.
                                    All your personal medical information will be securely stored and used only
                                    for healthcare purposes. We ensure the confidentiality and integrity of your data.
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ProfilePage;