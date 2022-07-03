import { ReactElement } from 'react';

import Button from '@mui/material/Button';
import Dropdown from './Dropdown';
import PageSelector from './PageSelector';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

const RegisterAndEdit = (): ReactElement => {
    return (
        <div>
            <Dropdown text='CADASTRAR' prepend='new' isEdit={false} />
            <Dropdown text='EDITAR' prepend='edit' isEdit={true} />
        </div>
    );
};

const NewSaleAndStock = (): ReactElement => {
    return (
        <div style={{ justifyContent: 'right' }}>
            <Button
                variant='contained'
                color='secondary'
                href='/inventory-manager/newstock'
                startIcon={<InventoryIcon />}
            >
                <div className='hideOnSmallScreens'>ENTRADA</div>
            </Button>

            <Button
                variant='contained'
                color='success'
                href='/inventory-manager/newsale'
                startIcon={<AttachMoneyIcon />}
            >
                <div className='hideOnSmallScreens'>VENDA</div>
            </Button>
        </div>
    );
};

const TopBar = (): ReactElement => {
    return (
        <>
            <div className='topBar hideOnMobile'>
                <RegisterAndEdit />
                <PageSelector />
                <NewSaleAndStock />
            </div>

            <div className='topBar showOnlyOnMobile'>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: '20px' }}>
                    <RegisterAndEdit />
                    <NewSaleAndStock />
                </div>

                <PageSelector />
            </div>
        </>
    );
};

export default TopBar;
