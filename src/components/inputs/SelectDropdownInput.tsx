import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ReactElement } from 'react';

interface Properties {
    value: string;
    action: (event: SelectChangeEvent<string>) => void;
    list: Array<any>;
    label: string;
}

const SelectDropdownInput = (props: Properties): ReactElement => {
    return (
        <FormControl variant='filled'>
            <InputLabel id='selectCustomer'> {props.label} </InputLabel>
            <Select id='selectCustomer' value={props.value} onChange={props.action}>
                {
                    props.list.map((item: any) => (
                        <MenuItem value={item.id} key={item.id}>
                            {item.name}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
};

export default SelectDropdownInput;
