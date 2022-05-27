import Button from '@mui/material/Button';
import Dropdown from './Dropdown';
import ButtonGroup from '@mui/material/ButtonGroup';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

const TopBar = () => {
    return (
        <div className='topBar'>
            <Dropdown text='CADASTRAR' prepend='new' isEdit={false} />
            <Dropdown text='EDITAR' prepend='edit' isEdit={true} />

            <div className='spacer' />

            <ButtonGroup variant="contained">
                <Button href='/inventory-manager/' className='navButton'>ESTOQUE</Button>
                <Button href='/inventory-manager/clients' className='navButton'>CLIENTES</Button>
                <Button href='/inventory-manager/sales' className='navButton'>VENDAS</Button>
            </ButtonGroup>

            <div className='spacer' />

            <Button
                variant="contained"
                color="secondary"
                href='/inventory-manager/newbatch'
                startIcon={<InventoryIcon />}
            >
                REGISTRAR ENTRADA
            </Button>

            <Button
                variant="contained"
                color="primary"
                href='/inventory-manager/newsale'
                startIcon={<AttachMoneyIcon />}
            >
                REGISTRAR VENDA
            </Button>
        </div>
    )
}

export default TopBar