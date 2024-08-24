import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme, Container, Box, Button, IconButton } from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerC from './Drawer';
import CICLOGO from "./../../assets/cic-logo.png";

const Navbar = () => {
    const [value, setValue] = useState('Inicio');
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.substring(1);
        setValue(path === '' ? 'Inicio' : path.charAt(0).toUpperCase() + path.slice(1));
    }, [location]);

    const navItems = [
        { label: 'Inicio', path: '/' },
        { label: 'Mapas', path: '/mapas' },
        { label: 'Resultados', path: '/resultados' },
        { label: 'Estadísticas', path: '/estadisticas' },
    ];

    return (
        <AppBar position="sticky" elevation={0} sx={{ 
            background: 'linear-gradient(45deg, #800040 30%, #e8824d 90%)',
            transition: 'all 0.3s',
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PolicyIcon sx={{ display: 'flex', mr: 1, color: 'white' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: 'flex',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                            flexGrow: { xs: 1, md: 0 }
                        }}
                    >
                        CIC-DELITOS
                    </Typography>

                    {isMatch ? (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ ml: 2 }}
                        >
                            <DrawerC />
                        </IconButton>
                    ) : (
                        <>
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                                <Tabs 
                                    value={value} 
                                    onChange={(e, newValue) => setValue(newValue)}
                                    textColor="inherit"
                                    indicatorColor="secondary"
                                    sx={{ '& .MuiTab-root': { color: 'white' } }}
                                >
                                    {navItems.map((item) => (
                                        <Tab 
                                            key={item.label}
                                            label={item.label} 
                                            value={item.label} 
                                            component={Link} 
                                            to={item.path}
                                            sx={{
                                                '&:hover': {
                                                    color: 'secondary.main',
                                                    transition: 'all 0.3s'
                                                }
                                            }}
                                        />
                                    ))}
                                </Tabs>
                            </Box>
                            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                                <img src={CICLOGO} alt='logo' style={{ height: '45px', marginLeft: '20px' }} />
                            </Box>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;