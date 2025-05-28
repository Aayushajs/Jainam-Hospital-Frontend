import { useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
    TextField,
    Paper,
    Box,
    Tabs,
    Tab,
    Divider,
    IconButton,
    Badge,
    Avatar,
    Stack,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    LinearProgress // Added for visual feedback/loading
} from '@mui/material';
import {
    LocalHospital,
    DirectionsCar,
    LocalPharmacy,
    Bloodtype,
    Emergency,
    Notifications,
    Person,
    Search,
    ArrowForward,
    GpsFixed, // For location
    MedicalServices, // For emergency type
    Home, // For address
    CalendarToday, // For time
    CheckCircle, // For status
    HourglassTop, // For status
    RadioButtonUnchecked // For status
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingButton2 from '../components/FloatingButton2';
import FloatingButton from '../components/FloatingButton';

// --- Helper: Tab Panel Component ---
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`emergency-tabpanel-${index}`}
            aria-labelledby={`emergency-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: { xs: 2, sm: 3 }, pt: 4 }}>
                    <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -20 }}
                       transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </Box>
            )}
        </div>
    );
}

// --- Helper: Stat Card Component ---
const StatCard = ({ title, value, subtitle, icon, color = 'primary', gradient }) => (
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
        <Card sx={{
            borderRadius: 3,
            boxShadow: '0 8px 16px -4px rgba(0,0,0,0.1)',
            color: 'white',
            background: gradient || `linear-gradient(135deg, ${color}.light 0%, ${color}.main 100%)`,
            height: '100%'
        }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                        {icon}
                    </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mt: 'auto' }}>{value}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>{subtitle}</Typography>
            </CardContent>
        </Card>
    </motion.div>
);

// --- Main Dashboard Component ---
export default function EmergencyDashboard() {
    const [activeTab, setActiveTab] = useState(0);
    const [ambulanceForm, setAmbulanceForm] = useState({ pickup: '', destination: '', emergencyType: '' });
    const [medicineForm, setMedicineForm] = useState({ medicine: '', address: '', urgency: 'normal' });
    const [bloodForm, setBloodForm] = useState({ bloodType: '', units: 1, hospital: '' });
    

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSubmit = (e, message) => {
        e.preventDefault();
        // In a real app, dispatch an action, show a toast/snackbar
        alert(message);
    };

    const recentActivities = [
        { type: 'Ambulance', details: 'Heart attack case - Sector 12', time: '15 mins ago', status: 'In Progress', icon: <DirectionsCar color="error" />, chipColor: 'warning' },
        { type: 'Medicine', details: 'Insulin delivery - Green Park', time: '25 mins ago', status: 'Delivered', icon: <LocalPharmacy color="primary" />, chipColor: 'success' },
        { type: 'Blood', details: 'O+ (2 units) - City Hospital', time: '1 hour ago', status: 'Completed', icon: <Bloodtype color="secondary" />, chipColor: 'success' },
        { type: 'Other', details: 'ICU Bed Request - Max Hospital', time: '2 hours ago', status: 'Processing', icon: <Emergency color="info" />, chipColor: 'info' }
    ];

    return (
        <Container maxWidth="xl" sx={{ py: 20, background: '#f4f6f8', minHeight: '100vh' }}>

            {/* Header / AppBar */}
            <Paper elevation={0} sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
                p: 2,
                borderRadius: 3,
                background: 'white',
               
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
                        <LocalHospital />
                    </Avatar>
                    <Typography variant="h5" component="h1" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block'} }}>
                        Emergency Services Dashboard
                    </Typography>
                     <Typography variant="h6" component="h1" sx={{ fontWeight: 700, display: { xs: 'block', sm: 'none'} }}>
                        Emergency
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton color="inherit" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
                        <Search />
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge badgeContent={3} color="error">
                            <Notifications />
                        </Badge>
                    </IconButton>
                 
                </Box>
            </Paper>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Ambulances" value="12" subtitle="Active Units" icon={<DirectionsCar />} gradient="linear-gradient(135deg, #ef5350 0%, #d32f2f 100%)" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Medicine Orders" value="8" subtitle="Today's Urgent" icon={<LocalPharmacy />} gradient="linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Alerts Today" value="3" subtitle="High Priority" icon={<Emergency />} gradient="linear-gradient(135deg, #66bb6a 0%, #388e3c 100%)" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Blood Requests" value="5" subtitle="Pending Cases" icon={<Bloodtype />} gradient="linear-gradient(135deg, #ab47bc 0%, #7b1fa2 100%)" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Alerts Today" value="3" subtitle="High Priority" icon={<Emergency />} gradient="linear-gradient(135deg, #66bb6a 0%, #388e3c 100%)" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Ambulances" value="12" subtitle="Active Units" icon={<DirectionsCar />} gradient="linear-gradient(135deg, #ef5350 0%, #d32f2f 100%)" />
                </Grid>
            </Grid>

            {/* Main Content */}
            <Grid container spacing={4}>
                {/* Left Panel: Service Requests */}
                <Grid item xs={12} lg={8}>
                    <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden', background: 'white' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', background: '#fff' }}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                allowScrollButtonsMobile
                                aria-label="emergency service tabs"
                                sx={{
                                    '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, minHeight: 64 },
                                    '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' }
                                }}
                            >
                                <Tab label="Ambulance" icon={<DirectionsCar />} iconPosition="start" />
                                <Tab label="Medicine" icon={<LocalPharmacy />} iconPosition="start" />
                                <Tab label="Blood Bank" icon={<Bloodtype />} iconPosition="start" />
                                <Tab label="General Alert" icon={<Emergency />} iconPosition="start" />
                            </Tabs>
                        </Box>

                        <AnimatePresence mode="wait">
                            <TabPanel value={activeTab} index={0}>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Request Ambulance Service</Typography>
                                <Box component="form" onSubmit={(e) => handleSubmit(e, `Ambulance requested from ${ambulanceForm.pickup} to ${ambulanceForm.destination}`)}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <TextField fullWidth label="Pickup Location" variant="outlined" value={ambulanceForm.pickup} onChange={(e) => setAmbulanceForm({ ...ambulanceForm, pickup: e.target.value })} required InputProps={{ startAdornment: <InputAdornment position="start"><GpsFixed /></InputAdornment> }} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField fullWidth label="Destination Hospital" variant="outlined" value={ambulanceForm.destination} onChange={(e) => setAmbulanceForm({ ...ambulanceForm, destination: e.target.value })} required InputProps={{ startAdornment: <InputAdornment position="start"><LocalHospital /></InputAdornment> }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth variant="outlined" required>
                                                <InputLabel>Emergency Type</InputLabel>
                                                <Select label="Emergency Type" value={ambulanceForm.emergencyType} onChange={(e) => setAmbulanceForm({ ...ambulanceForm, emergencyType: e.target.value })} startAdornment={<InputAdornment position="start"><MedicalServices /></InputAdornment>}>
                                                    <MenuItem value=""><em>Select Type</em></MenuItem>
                                                    <MenuItem value="accident">Accident / Trauma</MenuItem>
                                                    <MenuItem value="heart">Cardiac Emergency</MenuItem>
                                                    <MenuItem value="stroke">Stroke / Neurological</MenuItem>
                                                    <MenuItem value="maternity">Maternity</MenuItem>
                                                    <MenuItem value="other">Other Critical</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="error" size="large" endIcon={<ArrowForward />} sx={{ borderRadius: '25px', px: 4, py: 1.5 }}>Request Now</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </TabPanel>

                            <TabPanel value={activeTab} index={1}>
                                 <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Request Emergency Medicine Delivery</Typography>
                                <Box component="form" onSubmit={(e) => handleSubmit(e, `${medicineForm.medicine} will be delivered to ${medicineForm.address}`)}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <TextField fullWidth label="Medicine Name / Prescription ID" variant="outlined" value={medicineForm.medicine} onChange={(e) => setMedicineForm({ ...medicineForm, medicine: e.target.value })} required InputProps={{ startAdornment: <InputAdornment position="start"><LocalPharmacy /></InputAdornment> }} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField fullWidth label="Delivery Address" variant="outlined" value={medicineForm.address} onChange={(e) => setMedicineForm({ ...medicineForm, address: e.target.value })} required InputProps={{ startAdornment: <InputAdornment position="start"><Home /></InputAdornment> }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                           <FormControl fullWidth variant="outlined" required>
                                                <InputLabel>Urgency Level</InputLabel>
                                                <Select label="Urgency Level" value={medicineForm.urgency} onChange={(e) => setMedicineForm({ ...medicineForm, urgency: e.target.value })}>
                                                    <MenuItem value="normal">Normal (within 2 hours)</MenuItem>
                                                    <MenuItem value="urgent">Urgent (within 1 hour)</MenuItem>
                                                    <MenuItem value="emergency">Emergency (ASAP)</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="primary" size="large" endIcon={<ArrowForward />} sx={{ borderRadius: '25px', px: 4, py: 1.5 }}>Request Delivery</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </TabPanel>

                            <TabPanel value={activeTab} index={2}>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Request Blood Units</Typography>
                                <Box component="form" onSubmit={(e) => handleSubmit(e, `${bloodForm.units} units of ${bloodForm.bloodType} blood requested for ${bloodForm.hospital}`)}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4}>
                                           <FormControl fullWidth variant="outlined" required>
                                                <InputLabel>Blood Type</InputLabel>
                                                <Select label="Blood Type" value={bloodForm.bloodType} onChange={(e) => setBloodForm({ ...bloodForm, bloodType: e.target.value })}>
                                                    <MenuItem value=""><em>Select Type</em></MenuItem>
                                                    <MenuItem value="A+">A+</MenuItem> <MenuItem value="A-">A-</MenuItem>
                                                    <MenuItem value="B+">B+</MenuItem> <MenuItem value="B-">B-</MenuItem>
                                                    <MenuItem value="AB+">AB+</MenuItem> <MenuItem value="AB-">AB-</MenuItem>
                                                    <MenuItem value="O+">O+</MenuItem> <MenuItem value="O-">O-</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField fullWidth label="Units Required" variant="outlined" type="number" inputProps={{ min: 1 }} value={bloodForm.units} onChange={(e) => setBloodForm({ ...bloodForm, units: parseInt(e.target.value) || 1 })} required />
                                        </Grid>
                                         <Grid item xs={12} md={4}>
                                            <TextField fullWidth label="Destination Hospital" variant="outlined" value={bloodForm.hospital} onChange={(e) => setBloodForm({ ...bloodForm, hospital: e.target.value })} required InputProps={{ startAdornment: <InputAdornment position="start"><LocalHospital /></InputAdornment> }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="secondary" size="large" endIcon={<ArrowForward />} sx={{ borderRadius: '25px', px: 4, py: 1.5 }}>Request Blood</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </TabPanel>

                             <TabPanel value={activeTab} index={3}>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Report General Emergency</Typography>
                                <Typography variant="body1" sx={{ mb: 3 }}>
                                    Use this for situations requiring immediate attention but not fitting other categories, or call 112 directly.
                                </Typography>
                                 <TextField fullWidth label="Describe the Emergency" variant="outlined" multiline rows={4} sx={{mb: 3}}/>
                                 <Button variant="contained" color="warning" size="large" startIcon={<Emergency />} sx={{ borderRadius: '25px', px: 4, py: 1.5 }}>
                                     Report Emergency
                                 </Button>
                            </TabPanel>
                        </AnimatePresence>
                    </Paper>
                </Grid>

                {/* Right Panel: Recent Activity */}
                <Grid item xs={12} lg={4}>
                     <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: 'white', height: '100%' }}>
                         <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Recent Activity</Typography>
                         <TableContainer>
                             <Table size="small" aria-label="recent activity table">
                                 <TableHead>
                                     <TableRow>
                                         <TableCell sx={{fontWeight: 'bold'}}>Type</TableCell>
                                         <TableCell sx={{fontWeight: 'bold'}}>Details</TableCell>
                                         <TableCell sx={{fontWeight: 'bold'}}>Status</TableCell>
                                     </TableRow>
                                 </TableHead>
                                 <TableBody>
                                     {recentActivities.map((row) => (
                                         <TableRow key={row.details} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                             <TableCell>
                                                 <Avatar sx={{ bgcolor: `${row.chipColor}.light`, width: 32, height: 32 }}>
                                                    {row.icon}
                                                 </Avatar>
                                             </TableCell>
                                             <TableCell>
                                                 <Typography variant="body2" sx={{fontWeight: 500}}>{row.details}</Typography>
                                                 <Typography variant="caption" color="text.secondary">{row.time}</Typography>
                                             </TableCell>
                                             <TableCell>
                                                 <Chip label={row.status} color={row.chipColor} size="small" />
                                             </TableCell>
                                         </TableRow>
                                     ))}
                                 </TableBody>
                             </Table>
                         </TableContainer>
                         <Button fullWidth variant="text" sx={{ mt: 2, textTransform: 'none' }}>View All Activity</Button>
                     </Paper>
                </Grid>
            </Grid>
            <FloatingButton/>
            <FloatingButton2/>
        </Container>
    );
}