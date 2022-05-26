import Button from '@mui/material/Button';
import Dropdown from './Dropdown';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

const TopBar = () => {
    return (
        <div className='topBar'>
            <Dropdown text='CADASTRAR' prepend='new' isEdit={false} />
            <Dropdown text='EDITAR' prepend='edit' isEdit={true} />

            <div className='spacer' />

            <Button
                variant="contained"
                color="secondary"
                href='/entrada'
            >
                <InventoryIcon />
                &nbsp;
                REGISTRAR ENTRADA
            </Button>

            <Button
                variant="contained"
                color="primary"
                href='/venda'
            >
                <AttachMoneyIcon />
                &nbsp;
                REGISTRAR VENDA
            </Button>
        </div>
    )
}

export default TopBar