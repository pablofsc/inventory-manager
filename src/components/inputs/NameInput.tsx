import { TextField } from '@mui/material';
import { ReactElement } from 'react';

interface Properties {
    id: string;
    label: string,
    action: (event: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    disabled?: boolean;
    shrink?: boolean;
};

const NameInput = (props: Properties): ReactElement => {
    const shrink = props.shrink || !props.disabled;

    return (
        <TextField
            variant='filled'

            id={props.id}
            label={props.label}
            onChange={props.action}
            placeholder={props.placeholder}
            disabled={props.disabled}
            InputLabelProps={{ shrink: shrink }}
        />
    );
};

export default NameInput;