import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ReactElement } from 'react';

const GoBack = (): ReactElement => {
    return (
        <>
            <a href='/inventory-manager/'>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                >
                    VOLTAR PARA ESTOQUE
                </Button>
            </a>
        </>
    )
}

export default GoBack