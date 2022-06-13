import { ReactElement } from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GoBack = (): ReactElement => {
    return (
        <>
            <a href='/inventory-manager/'>
                <Button variant='contained' startIcon={<ArrowBackIcon />} >
                    VOLTAR PARA ESTOQUE
                </Button>
            </a>
        </>
    );
};

export default GoBack;