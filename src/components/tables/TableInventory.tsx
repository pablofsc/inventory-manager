import { DataGrid, GridColDef, GridSortItem } from '@mui/x-data-grid';
import { useState, useEffect, ReactElement } from 'react';

import { getFromDatabase } from '../../utilities/database';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Produto',
        flex: 1,
    },
    {
        field: 'default_price',
        headerName: 'Preço',
        width: 150,
    },
    {
        field: 'quantity_in_stock',
        headerName: 'Estoque',
        width: 150,
    },
];

const TableInventory = (): ReactElement => {
    const [products, setProducts] = useState<Array<Object>>([]);

    useEffect((): void => {
        getFromDatabase('inventory').then((result: Array<Object>) => setProducts(result));
    }, []);

    const [sortModel, setSortModel] = useState<Array<GridSortItem>>([
        {
            field: 'name',
            sort: 'asc',
        },
    ]);

    return (
        <div className='tableParent'>
            <h1>Estoque</h1>
            <DataGrid
                rows={products}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
            />
        </div>
    );
};

export default TableInventory;
