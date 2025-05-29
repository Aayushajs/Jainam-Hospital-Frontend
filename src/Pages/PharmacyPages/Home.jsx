import { Container, Grid, Typography, Box, Button, Stack, Skeleton, Chip, Paper, TextField, InputAdornment, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import ProductCard from '../../components/Pharmacy/ProductCard';
import AdBanner from '../../components/Pharmacy/AdBanner';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../store/productSlice';
import { useEffect, useState } from 'react'; // Added useState
import { motion } from 'framer-motion';
import {
    LocalPharmacy as PharmacyIcon,
    MedicalServices as MedsIcon,
    Favorite as HeartIcon,
    Star as StarIcon,
    Discount as DiscountIcon,
    LocalHospital as HospitalIcon,
    Search as SearchIcon,
    Spa as WellnessIcon,
    Face as PersonalCareIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import FloatingButton from '../../components/FloatingButton';
import FloatingButton2 from '../../components/FloatingButton2';

const PlaceholderProductCard = ({ product }) => (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3, height: '100%' }}>
        <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 2, mb: 2 }} />
        <Typography variant="h6" gutterBottom><Skeleton width="80%" /></Typography>
        <Typography variant="body2" color="text.secondary"><Skeleton width="60%" /></Typography>
        <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}><Skeleton width="40%" /></Typography>
        <Button variant="contained" fullWidth sx={{ mt: 2, borderRadius: '20px' }}>
            <Skeleton width="50%" sx={{color: 'white'}}/>
        </Button>
    </Paper>
);

const PlaceholderAdBanner = () => (
    <Box sx={{
        height: 350,
        background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        p: 4,
        mb: -8
    }}>
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 1, textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>
                Your Health, Our Priority.
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 300 }}>
                Find medicines, consult doctors, and stay healthy.
            </Typography>
        </motion.div>
    </Box>
);

const SectionHeader = ({ title, gradient, viewAllLink = "#", color = 'primary' }) => (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" sx={{
            fontWeight: 700,
            position: 'relative',
            pb: 1,
            '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '70px',
                height: '5px',
                background: gradient || 'linear-gradient(90deg, #3f51b5, #2196f3)',
                borderRadius: '3px'
            }
        }}>
            {title}
        </Typography>
        <Button
            variant="text"
            color={color}
            endIcon={<ArrowForwardIcon />}
            href={viewAllLink}
            sx={{
                textTransform: 'none',
                borderRadius: '20px',
                fontWeight: 600,
                '&:hover': { background: (theme) => `${theme.palette[color].light}33` }
            }}
        >
            View All
        </Button>
    </Stack>
);

export default function Home() {
    const navigate = useNavigate(); // For navigation
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true); // Loading state
    
    const { items: products = [], status = 'loading' } = useSelector((state) => state.products) || { items: [], status: 'loading' };

    // Dummy Products for Demo
    const dummyProducts = [
        { id: 1, name: "Paracetamol 500mg", price: "2.50", image: "https://wellify.in/cdn/shop/products/DigiplexLiquid-100ml_TOP06.jpg?v=1732861765" },
        { id: 2, name: "Vitamin C Effervescent", price: "8.99", image: "https://cdn01.pharmeasy.in/dam/products_otc/J74734/digeplex-digestion-liquid-sugar-free-bottle-of-200ml-1-1707374925.jpg?dim=400x0&dpr=1&q=100" },
        { id: 3, name: "Digital Thermometer", price: "12.00", image: "https://www.marshallspetzone.com/17189-large_default/care-best-ketoconazole-tablets-ip-200-mg.jpg" },
        { id: 4, name: "Hand Sanitizer 100ml", price: "3.20", image: "https://5.imimg.com/data5/SELLER/Default/2023/5/307797715/FU/EL/RC/90163806/condom-3-250x250.jpg" },
        { id: 5, name: "Multivitamin Gummies", price: "15.50", image: "https://www.stanfordchildrens.org/content-public/topic/images/91/384891.jpeg" },
        { id: 6, name: "Sunscreen SPF 50", price: "18.75", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/358138409/VO/ZU/BJ/152647523/iycotic-ketoconazole-tablets-250x250.jpeg" },
        { id: 7, name: "Pain Relief Gel", price: "7.80", image: "https://drmeghanapande.com/wp-content/uploads/2021/04/General-Medicine-and-Internal-Medicine.jpg" },
        { id: 8, name: "Face Wash - Neem", price: "6.00", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25_r1RICAQnR-UgqdOCeT-qNMnHITnkZd2Q&s" },
        { id: 9, name: "Multivitamin Gummies", price: "15.50", image: "https://www.stanfordchildrens.org/content-public/topic/images/91/384891.jpeg" },
        { id: 10, name: "Sunscreen SPF 50", price: "18.75", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/358138409/VO/ZU/BJ/152647523/iycotic-ketoconazole-tablets-250x250.jpeg" },
        { id: 11, name: "Pain Relief Gel", price: "7.80", image: "https://drmeghanapande.com/wp-content/uploads/2021/04/General-Medicine-and-Internal-Medicine.jpg" },
        { id: 12, name: "Face Wash - Neem", price: "6.00", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25_r1RICAQnR-UgqdOCeT-qNMnHITnkZd2Q&s" },
        { id: 13, name: "Multivitamin Gummies", price: "15.50", image: "https://www.stanfordchildrens.org/content-public/topic/images/91/384891.jpeg" },
        { id: 14, name: "Sunscreen SPF 50", price: "18.75", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/358138409/VO/ZU/BJ/152647523/iycotic-ketoconazole-tablets-250x250.jpeg" },
        { id: 15, name: "Pain Relief Gel", price: "7.80", image: "https://drmeghanapande.com/wp-content/uploads/2021/04/General-Medicine-and-Internal-Medicine.jpg" },
        { id: 16, name: "Face Wash - Neem", price: "6.00", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25_r1RICAQnR-UgqdOCeT-qNMnHITnkZd2Q&s" },
        { id: 17, name: "Multivitamin Gummies", price: "15.50", image: "https://www.stanfordchildrens.org/content-public/topic/images/91/384891.jpeg" },
        { id: 18, name: "Sunscreen SPF 50", price: "18.75", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/358138409/VO/ZU/BJ/152647523/iycotic-ketoconazole-tablets-250x250.jpeg" },
        { id: 19, name: "Pain Relief Gel", price: "7.80", image: "https://drmeghanapande.com/wp-content/uploads/2021/04/General-Medicine-and-Internal-Medicine.jpg" },
        { id:20, name: "Face Wash - Neem", price: "6.00", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25_r1RICAQnR-UgqdOCeT-qNMnHITnkZd2Q&s" },
    ];

    // Use dummy products if Redux fetch is not working or in 'loading'
    const displayProducts = (products.length > 0 && status !== 'loading') ? products : dummyProducts;

    useEffect(() => {
        // Show skeleton loader for 1 second
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);
        
        // dispatch(getProducts()); // Uncomment if Redux is set up
        
        return () => clearTimeout(timer);
    }, [dispatch]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0, delayChildren: 0 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    const categories = [
        { name: "Prescription", icon: <PharmacyIcon />, color: '#3f51b5' },
        { name: "OTC Medicines", icon: <MedsIcon />, color: '#00bcd4' },
        { name: "Wellness", icon: <WellnessIcon />, color: '#4caf50' },
        { name: "Personal Care", icon: <PersonalCareIcon />, color: '#ff9800' },
        { name: "Vitamins", icon: <StarIcon />, color: '#f44336' },
        { name: "Deals", icon: <DiscountIcon />, color: '#9c27b0' }
    ];

    // Handle product click
    const handleProductClick = (productId) => {
        navigate(`/`);
    };

    // Use PlaceholderProductCard if ProductCard is not available
    const CurrentProductCard = ProductCard || (({ product }) => (
        <Paper 
            elevation={3} 
            sx={{ p: 2, borderRadius: 3, height: '100%', cursor: 'pointer' }}
            onClick={() => handleProductClick(product.id)}
        >
            <Box sx={{ height: 160, mb: 2, borderRadius: 2, overflow: 'hidden' }}>
                <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>
            <Typography variant="h6" gutterBottom>{product.name}</Typography>
            <Typography variant="body2" color="text.secondary">Category</Typography>
            <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>${product.price}</Typography>
            <Button 
                variant="contained" 
                fullWidth 
                sx={{ mt: 2, borderRadius: '20px' }}
                onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart logic here
                }}
            >
                Add to Cart
            </Button>
        </Paper>
    ));

    const CurrentAdBanner = AdBanner || PlaceholderAdBanner;

    return (
        <Container maxWidth="xl" sx={{ mt: 0, mb: 6, pt: {xs: 8, md: 10}, background: '#f9fafb' }}>
            <Box sx={{py:5, mb:-5}}> <CurrentAdBanner /></Box>

            {/* Search Bar */}
            <Box sx={{
                mt: 3,
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 10,
                mb: 8,
            }}>
                <Paper elevation={6} sx={{
                    width: '100%',
                    maxWidth: '750px',
                    borderRadius: '50px',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    background: 'white',
                }}>
                    <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Search for medicines, health products & more..."
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start" sx={{ pl: 1, color: 'text.disabled' }}>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            sx: {
                                padding: '8px 12px',
                                fontSize: '1rem',
                            }
                        }}
                        sx={{
                            flex: 1,
                            '& .MuiInputBase-input': {
                                borderRadius: '50px',
                                paddingLeft: '10px'
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: '50px',
                            px: 5,
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: 'none',
                            fontSize: '1rem',
                            '&:hover': {
                                transform: 'scale(1.02)'
                            }
                        }}
                    >
                        Search
                    </Button>
                </Paper>
            </Box>

            {/* Categories Section */}
            <Box sx={{ my: 8 }}>
                <Typography variant="h5" component="h2" sx={{
                    fontWeight: 600,
                    mb: 4,
                    textAlign: 'center',
                    color: 'text.primary'
                }}>
                    Shop by <span style={{ color: '#3f51b5' }}>Category</span>
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {categories.map((category) => (
                        <Grid item xs={6} sm={4} md={2} key={category.name}>
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
                                initial="hidden"
                                animate="visible"
                            >
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 3,
                                        borderRadius: 4,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        border: '1px solid #eee',
                                        '&:hover': {
                                            boxShadow: 6,
                                            borderColor: category.color,
                                            '& .MuiAvatar-root': {
                                                background: category.color,
                                                color: 'white',
                                                transform: 'scale(1.1)'
                                            },
                                            '& .MuiTypography-root': {
                                               color: category.color,
                                               fontWeight: 600
                                            }
                                        }
                                    }}
                                >
                                    <Avatar sx={{
                                        width: 56,
                                        height: 56,
                                        mb: 1.5,
                                        mx: 'auto',
                                        backgroundColor: `${category.color}22`,
                                        color: category.color,
                                        fontSize: 32,
                                        transition: 'all 0.3s ease',
                                    }}>
                                        {category.icon}
                                    </Avatar>
                                    <Typography variant="body1" sx={{ fontWeight: 500, transition: 'color 0.3s ease' }}>
                                        {category.name}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Featured Products */}
            <Box sx={{ my: 10 }}>
                <SectionHeader
                    title="Featured Products"
                    gradient="linear-gradient(90deg, #3f51b5, #2196f3)"
                />
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <Grid container spacing={4}>
                        {(isLoading ? [...Array(20)] : displayProducts.slice(0, 8)).map((product, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product?.id || index}>
                                <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }}>
                                    {isLoading ? (
                                        <PlaceholderProductCard product={{}}/>
                                    ) : (
                                        <div onClick={() => handleProductClick(product.id)}>
                                            <CurrentProductCard product={product} />
                                        </div>
                                    )}
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Box>

            {/* Health Tips Banner */}
            <Box sx={{
                my: 10,
                background: 'linear-gradient(135deg, #667eea 0%,rgb(115, 51, 178) 100%)',
                borderRadius: 4,
                overflow: 'hidden',
                color: 'white',
                position: 'relative',
                boxShadow: 5
            }}>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={6} sx={{ p: { xs: 4, md: 6} }}>
                        <Chip
                            label="Health Tips"
                            sx={{
                                backgroundColor: 'rgba(153, 105, 105, 0.25)',
                                color: 'white',
                                mb: 2,
                                fontWeight: 'bold'
                            }}
                        />
                        <Typography variant="h4" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
                            Summer Health Care Guide
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                            Discover essential tips to stay healthy during summer. Learn about hydration,
                            sun protection, and seasonal allergies management.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'white',
                                color: '#667eea',
                                borderRadius: '50px',
                                px: 4,
                                py: 1.5,
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                    transform: 'scale(1.05)'
                                }
                            }}
                        >
                            Read Article
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{
                        display: { xs: 'none', md: 'block' },
                        minHeight: 300,
                        backgroundImage: 'url(/images/health-tips.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)'
                    }} />
                </Grid>
            </Box>

            {/* Trending Products */}
            <Box sx={{ my: 10 }}>
                <SectionHeader
                    title="Trending Now"
                    gradient="linear-gradient(90deg, #ff9800, #ff5722)"
                    color="secondary"
                />
                 <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <Grid container spacing={4}>
                       {(isLoading ? [...Array(8)] : displayProducts.slice(0, 8)).map((product, index) => (
                           <Grid item xs={12} sm={6} md={4} lg={3} key={product?.id || index}>
                               <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }}>
                                    {isLoading ? (
                                        <PlaceholderProductCard product={{}}/>
                                    ) : (
                                        <div onClick={() => handleProductClick(product.id)}>
                                            <CurrentProductCard product={product} />
                                        </div>
                                    )}
                               </motion.div>
                           </Grid>
                       ))}
                    </Grid>
                 </motion.div>
            </Box>

            {/* Special Offers Section */}
            <Box sx={{ my: 10 }}>
                <SectionHeader
                    title="Hot Deals"
                    gradient="linear-gradient(90deg, #f44336, #e91e63)"
                    color="error"
                />
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{
                            borderRadius: 4, p: { xs: 3, md: 5 }, height: '100%',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center',
                            background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
                            color: '#b71c1c',
                            position: 'relative', overflow: 'hidden'
                        }}>
                             <Chip label="Limited Time" sx={{
                                 backgroundColor: 'rgba(255,255,255,0.4)', color: '#b71c1c',
                                 mb: 2, fontWeight: 600, alignSelf: 'flex-start' }} />
                            <Typography variant="h3" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                Summer Wellness Sale
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                                Up to <span style={{color: '#f44336'}}>40% Off</span> on Vitamins
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
                                Boost your immunity with our premium selection of vitamins and supplements.
                            </Typography>
                             <Button variant="contained" sx={{
                                 backgroundColor: 'white', color: '#f44336', borderRadius: '50px',
                                 px: 4, py: 1.5, fontWeight: 600, alignSelf: 'flex-start',
                                 '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)', transform: 'scale(1.05)' }
                             }}>
                                Shop Now
                            </Button>
                             <Box sx={{
                                 position: 'absolute', right: -40, bottom: -30, width: '300px', height: '200px',
                                 backgroundImage: 'url(https://media.istockphoto.com/id/1398967806/photo/plastic-medical-container-and-white-capsule-pills-with-question-mark-on-blue-background-top.jpg?s=612x612&w=0&k=20&c=bEXrjZUjxn8Pnw-_Evz6DWGr6uFNIY8WQ47DVDOAI1k=)',
                                 backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
                                 opacity: 0.15, transform: 'rotate(-31deg)'
                             }} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{
                             borderRadius: 4, p: { xs: 3, md: 5 }, height: '100%',
                             display: 'flex', flexDirection: 'column', justifyContent: 'center',
                             background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                             color: '#1e88e5',
                        }}>
                             <Chip label="New Arrival" sx={{
                                 backgroundColor: 'rgba(255,255,255,0.4)', color: '#1e88e5',
                                 mb: 2, fontWeight: 600, alignSelf: 'flex-start' }} />
                            <Typography variant="h4" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                Organic Skincare
                            </Typography>
                             <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
                                 Discover our new range for healthy summer skin.
                             </Typography>
                             <Button variant="contained" sx={{
                                 backgroundColor: 'white', color: '#1e88e5', borderRadius: '50px',
                                 px: 4, py: 1.5, fontWeight: 600, alignSelf: 'flex-start',
                                 '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)', transform: 'scale(1.05)' }
                             }}>
                                Explore
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Testimonials Section */}
            <Box sx={{ my: 10, textAlign: 'center', py: 6, background: '#fff', borderRadius: 4, boxShadow: 2 }}>
                <Typography variant="h4" component="h2" sx={{
                    fontWeight: 700, mb: 6, position: 'relative', display: 'inline-block',
                    '&:after': {
                        content: '""', position: 'absolute', bottom: -10, left: '50%',
                        transform: 'translateX(-50%)', width: '70px', height: '5px',
                        background: 'linear-gradient(90deg, #4caf50, #8bc34a)', borderRadius: '3px'
                    }
                }}>
                    What Our Customers Say
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {[1, 2, 3].map((item) => (
                        <Grid item xs={12} sm={10} md={4} key={item}>
                             <motion.div whileHover={{ y: -8, scale: 1.02 }} style={{height: '100%'}}>
                                <Paper elevation={0} variant="outlined" sx={{
                                    borderRadius: 3, p: 4, height: '100%',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    textAlign: 'center', border: '1px solid #ddd'
                                }}>
                                    <Avatar sx={{ width: 60, height: 60, mb: 2, bgcolor: 'primary.main' }}>S</Avatar>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                        Sarah Johnson
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                                        Regular Customer
                                    </Typography>
                                    <Stack direction="row" spacing={0.5} sx={{ mb: 3, color: 'warning.main' }}>
                                        {[...Array(5)].map((_, star) => <StarIcon key={star} fontSize="small" />)}
                                    </Stack>
                                    <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary', flexGrow: 1 }}>
                                        "This pharmacy has been a lifesaver! Their delivery is fast and the staff is incredibly helpful and knowledgeable."
                                    </Typography>
                                </Paper>
                             </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <FloatingButton/>
            <FloatingButton2/>
        </Container>
    );
}