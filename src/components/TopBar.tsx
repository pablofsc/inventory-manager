import { ReactElement } from 'react';

import Button from '@mui/material/Button';
import Dropdown from './Dropdown';
import ButtonGroup from '@mui/material/ButtonGroup';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

const TopBar = (): ReactElement => {
    return (
        <div className='topBar hasShadow'>
            <div style={{ justifyContent: 'left' }}>
                <Dropdown text='CADASTRAR' prepend='new' isEdit={false} />
                <Dropdown text='EDITAR' prepend='edit' isEdit={true} />
            </div>

            <div style={{ justifyContent: 'center' }}>
                <ButtonGroup variant='contained'>
                    <Button href='/inventory-manager/' className='navButton'>ESTOQUE</Button>
                    <Button href='/inventory-manager/customers' className='navButton'>CLIENTES</Button>
                    <Button href='/inventory-manager/sales' className='navButton'>VENDAS</Button>
                </ButtonGroup>
            </div>

            <div style={{ justifyContent: 'right' }}>
                <Button
                    variant='contained'
                    color='secondary'
                    href='/inventory-manager/newstock'
                    startIcon={<InventoryIcon />}
                >
                    REGISTRAR ENTRADA
                </Button>

                <Button
                    variant='contained'
                    color='success'
                    href='/inventory-manager/newsale'
                    startIcon={<AttachMoneyIcon />}
                >
                    REGISTRAR VENDA
                </Button>
            </div>
        </div>
    );
};

export default TopBar;