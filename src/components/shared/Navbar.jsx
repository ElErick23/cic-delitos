import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { AppBar, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme, Container, Box, Button } from '@mui/material'

import PolicyIcon from '@mui/icons-material/Policy';

import DrawerC from './Drawer';
import CICLOGO from "./../../assets/cic-logo.png";

const Navbar = () => {
    const [value, setValue] = useState('Inicio');
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        let pathPure = window.location.pathname;
        let path = pathPure.substring(1, pathPure.length);
        if (path === "") {
            setValue("Inicio")
        } else if (path === "mapas") {
            setValue("Mapas");
        } else if (path === "resultados") {
            setValue("Resultados");
        } else if (path === "estadisticas") {
            setValue("Estadisticas");
        }
    }, []);

    return (
            <AppBar sx={{ background: "#800040" }} position="sticky">
                <Container maxWidth="xl">
                    <Toolbar >
                        {
                            isMatch ? (
                                <>
                                    <PolicyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                                    <Typography
                                        sx={{ fontSize: '1.2rem', marginLeft: '2%', marginRight: '5%' }}>
                                        CIC-DELITOS
                                    </Typography>
                                    <DrawerC />
                                </>
                            ) : (
                                <>
                                    <PolicyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                                    <Typography
                                        sx={{ fontSize: '1.2rem', marginLeft: '2%', marginRight: '5%' }}>
                                        CIC-DELITOS
                                    </Typography>
                                    <Tabs textColor="inherit"
                                        value={value}
                                        onChange={(e, value) => setValue(value)}
                                        TabIndicatorProps={{ style: { background: 'rgb(255,255,255)' } }}
                                    >
                                        <Tab value="Inicio" label='Inicio' to='/' component={Link} />
                                        <Tab value="Mapas" label='Mapas' to='/mapas' component={Link} />
                                        <Tab value="Resultados" label='Resultados' to='/resultados' component={Link} />
                                        <Tab value="Estadisticas" label='Estadisticas' to='/estadisticas' component={Link} />
                                    </Tabs>

                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                                    <img style={{ right: 0, alignSelf: "right" }} src={CICLOGO} alt='logo' />
                                </>
                            )
                        }
                    </Toolbar>
                </Container>
            </AppBar>
    );
}

export default Navbar;
