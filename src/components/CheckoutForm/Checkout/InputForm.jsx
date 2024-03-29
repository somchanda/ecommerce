import { Grid, TextField } from '@material-ui/core'
import React from 'react'
import {useFormContext, Controller} from 'react-hook-form'

const InputForm = ({name, label, required}) => {
    const {control} = useFormContext();
    return (
        <Grid item xs={12} sm={6}>
            <Controller as={TextField} control={control} fullWidth name={name} label={label} required={required}>

            </Controller>
        </Grid>
    )
}

export default InputForm
