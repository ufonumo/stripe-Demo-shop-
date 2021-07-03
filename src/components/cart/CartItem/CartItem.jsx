import React from 'react'
import { Button, Typography, Card, CardActions, CardContent, CardMedia} from '@material-ui/core'
import useStyles from './styles'

const CartItem = ({ item , handleRemoveFromCart , handleUpdateCartQty}) => {
    const classes = useStyles();


    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name}  className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant='h5'>{item.name}</Typography>
                <Typography variant='h6'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions  classes={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)} >-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button variant='contained' type='button' color='secondary' onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
