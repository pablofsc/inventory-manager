import { LoadingButton } from '@mui/lab';
import { ReactElement } from 'react';

import { DeleteForever, Save } from '@mui/icons-material';

interface Properties {
    action: () => void,
    disabled?: boolean;
    loading?: boolean;
    isDeleteVariant?: boolean;
    text?: string;
};

const ButtonInput = (props: Properties): ReactElement => {
    const label = props.text || (props.isDeleteVariant ? 'EXCLUIR' : 'SALVAR');
    const icon = props.isDeleteVariant ? <DeleteForever /> : <Save />;
    const color = props.isDeleteVariant ? 'error' : 'primary';

    return (
        <LoadingButton
            variant='contained'
            loadingPosition='start'
            style={{ width: 'fit-content' }}

            color={color}
            startIcon={icon}
            loading={props.loading}
            disabled={props.disabled}
            onClick={props.action}
        >
            {label}
        </LoadingButton>
    );
};

export default ButtonInput;