import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import Logo from '../../assets/logo.png'
import { Link , useLocation } from 'react-router-dom'

import useStyles from './styles'

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/'  variant='h6' className={classes.title} color='inherit'>
                        <img src={Logo} alt="lavendr" height='30px' className={classes.image} />
                        Lavendr
                    </Typography>
                    <div className={classes.grow}/>
                    { location.pathname === '/' &&  (
                        <div className={classes.button}>
                        <IconButton component={Link} to='/cart' aria-label='show cart items' color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                        </div>
                    )}
                    
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
