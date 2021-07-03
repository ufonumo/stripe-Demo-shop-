import React from 'react';
import { TextField, Grid,} from '@material-ui/core'
import { useFormContext , Controller} from 'react-hook-form'


const CustomTextField = ({ name , label , required}) => {
    const { control } = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller 
                as={TextField}
                control={control}
                render = {({ field})=> (
                    <TextField
                        fullWidth
                        label={label}
                        required={required}
                        name={name}
                    />
                )}
            />
        </Grid>
    )
}

export default CustomTextField
