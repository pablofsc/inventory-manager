import { ReactElement, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

enum displayed {
    other = 0,
    inventory = 1,
    customers = 2,
    sales = 3,
}

const PageSelector = (): ReactElement => {
    const [currentPage, setPage] = useState<displayed>();

    useEffect(() => {
        switch (window.location.pathname) {
            case '/inventory-manager/':
                setPage(displayed.inventory);
                break;

            case '/inventory-manager/customers':
                setPage(displayed.customers);
                break;

            case '/inventory-manager/sales':
                setPage(displayed.sales);
                break;

            default:
                setPage(displayed.other);
        }
    }, []);

    return (
        <div style={{ justifyContent: 'center' }}>
            <ButtonGroup disableElevation>
                <Button
                    variant={currentPage === displayed.inventory ? 'contained' : 'outlined'}
                    href='/inventory-manager/'
                    className='navButton'
                >
                    ESTOQUE
                </Button>
                <Button
                    variant={currentPage == displayed.customers ? 'contained' : 'outlined'}
                    href='/inventory-manager/customers'
                    className='navButton'
                >
                    CLIENTES
                </Button>
                <Button
                    variant={currentPage == displayed.sales ? 'contained' : 'outlined'}
                    href='/inventory-manager/sales'
                    className='navButton'
                >
                    VENDAS
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default PageSelector;
