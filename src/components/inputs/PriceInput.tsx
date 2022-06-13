import { InputAdornment, TextField } from '@mui/material';
import { ReactElement } from 'react';

interface Properties {
    id: string;
    label: string,
    action: (event: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    disabled?: boolean;
};

const PriceInput = (props: Properties): ReactElement => {
    return (
        <TextField
            variant='filled'
            type='number'

            id={props.id}
            label={props.label}
            onChange={props.action}
            placeholder={props.placeholder}
            disabled={props.disabled}
            InputProps={{ startAdornment: <InputAdornment position='start'>R$</InputAdornment>, }}
        />
    );
};

export default PriceInput;