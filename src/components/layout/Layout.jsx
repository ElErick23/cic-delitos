import React from 'react';
import Navbar from "./../shared/Navbar";
import { makeStyles } from '@material-ui/core';

const usesStyles = makeStyles((theme) => {
    return{
        root: {
            display: 'flex',
            flexDirection: 'column',
            height:"100vh"
        },
        page: {
            width: '100%',
            // height: '100%',
            flex:1,
            boxSizing:"border-box",
            // margin: "50px",
            // margin: "5vh",
            // marginTop: theme.spacing(5),
            // marginLeft: theme.spacing(5),
            // marginRight: theme.spacing(5),
        }
    };
})

const Layout = ({ children }) => {
    const classes = usesStyles()

    return(
        <div className={classes.root}>
            <Navbar />
            <div className={classes.page}>
                {children}
            </div>
        </div>
    );
}

export default Layout;