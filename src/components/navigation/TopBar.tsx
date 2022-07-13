import { ReactElement } from 'react';

import Dropdown from './Dropdown';
import PageSelector from './PageSelector';

import { AttachMoney, Inventory, PointOfSale } from '@mui/icons-material';

import BasicModal from '../modals/BasicModal';
import NewStock from '../forms/NewStock';
import NewSale from '../forms/NewSale';

const RegisterAndEdit = (): ReactElement => {
    return (
        <div>
            <Dropdown text='CADASTRAR' prepend='new' isEdit={false} />
        </div>
    );
};

const NewSaleAndStock = (): ReactElement => {
    return (
        <div style={{ justifyContent: 'right' }}>
            <BasicModal
                title='REGISTRAR ENTRADA DE ESTOQUE'
                icon={<Inventory />}
                label='ENTRADA'
                color='secondary'
            >
                <NewStock />
            </BasicModal>

            <BasicModal
                title='REGISTRAR VENDA'
                icon={<AttachMoney />}
                label='VENDA'
                color='success'
            >
                <NewSale />
            </BasicModal>
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
