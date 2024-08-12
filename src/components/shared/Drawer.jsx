import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PolicyIcon from '@mui/icons-material/Policy';

const DrawerC = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <React.Fragment>
            <Drawer
                PaperProps={{
                    sx: {
                        paddingLeft: '5%',
                        paddingRight: '8%',
                        backgroundColor: '#222831',
                        color: 'white'
                    }
                }}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItem>
                        <PolicyIcon />
                        <Typography
                            sx={{ fontSize: '1.2rem', marginLeft: '5%' }}>
                            CIC-DELITOS
                        </Typography>
                    </ListItem>

                    <ListItemButton
                        to='/' component={Link}
                        onClick={() => setOpenDrawer(false)}>
                        <ListItemIcon>
                            <ListItemText sx={{ color: '#F7F7F7' }} > Inicio </ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton
                        to='/mapas' component={Link}
                        onClick={() => setOpenDrawer(false)}>
                        <ListItemIcon>
                            <ListItemText sx={{ color: '#F7F7F7' }}> Mapas </ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton
                        to='/resultados' component={Link}
                        onClick={() => setOpenDrawer(false)}>
                        <ListItemIcon>
                            <ListItemText sx={{ color: '#F7F7F7' }}> Resultados </ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton
                        to='/estadisticas' component={Link}
                        onClick={() => setOpenDrawer(false)}>
                        <ListItemIcon>
                            <ListItemText sx={{ color: '#F7F7F7' }}> Estadísticas </ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
            <IconButton
                sx={{ color: 'white', marginLeft: 'auto' }}
                onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon sx={{ color: '#F7F7F7' }} />
            </IconButton>
        </React.Fragment>
    )
}

export default DrawerC;
