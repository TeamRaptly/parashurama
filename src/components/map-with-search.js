import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GoogleMap from "./google-map";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
    mappage: {
        paddingTop: "10px"
    },
    find: {
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
        margin: "auto",
        maxWidth: 600
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    searchContainer: {
        display: "flex",
        justifyContent: "center",
    }
}));

export default function MapWithSearch(props) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.find}>
                {props.search ? <div className={classes.searchContainer}>
                    <Paper component="form" className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search Google Maps"
                            inputProps={{ 'aria-label': 'search google maps' }} />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <Divider className={classes.divider} orientation="vertical" />
                        <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                            <DirectionsIcon />
                        </IconButton>
                    </Paper>
                </div> : null}
                <div className={classes.mappage}>
                    <GoogleMap />
                </div>
            </div >

        </>
    );
}