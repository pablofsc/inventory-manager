import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect, ReactElement } from 'react';

import { getFromDatabase } from '../../utilities/database';

const columns: GridColDef[] = [
    {
        field: 'product_name',
        headerName: 'Produto',
        flex: 1
    },
    {
        field: 'client_name',
        headerName: 'Cliente',
        flex: 1
    },
    {
        field: 'quantity',
        headerName: 'Quantidade',
        width: 150
    },
    {
        field: 'price',
        headerName: 'Preço',
        width: 150
    },
    {
        field: 'date'
    }
];

const TableSales = (): ReactElement => {
    const [sales, setSales] = useState<Array<Object>>([]);

    useEffect((): void => {
        getFromDatabase('sales').then((result: Array<Object>) => setSales(result));
    }, []);

    return (
        <div style={{ height: 600, width: '100%' }}>
            <h1>
                Histórico de vendas
            </h1>
            <DataGrid
                rows={sales}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
            />
        </div>
    );
};

export default TableSales;