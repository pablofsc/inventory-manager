import { DataGrid, GridColDef, GridSortItem } from '@mui/x-data-grid';
import { useState, useEffect, ReactElement } from 'react';

import { AttachMoney, Edit, Inventory } from '@mui/icons-material';

import { getFromDatabase } from '../../utilities/database';

import BasicModal from '../modals/BasicModal';
import EditProduct from '../forms/EditProduct';
import NewSale from '../forms/NewSale';
import NewStock from '../forms/NewStock';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Produto',
        flex: 1,
    },
    {
        field: 'default_price',
        headerName: 'Preço',
        width: 100,
    },
    {
        field: 'quantity_in_stock',
        headerName: 'Estoque',
        width: 100,
    },
    {
        field: 'edit',
        headerName: 'Ações',
        width: 200,
        renderCell: (params) =>
            <>
                <BasicModal
                    title={`REGISTRAR ENTRADA DE ESTOQUE`}
                    icon={<Inventory />}
                    color='info'
                    small
                    variant='text'
                >
                    <NewStock product={params.row} />
                </BasicModal>

                <BasicModal
                    icon={<Edit />}
                    title={`EDITANDO ${params.row.name.toUpperCase()}`}
                    color='info'
                    small
                    variant='text'
                >
                    <EditProduct product={params.row} />
                </BasicModal>

                <BasicModal
                    title={`REGISTRANDO VENDA DE ${params.row.name.toUpperCase()}`}
                    icon={<AttachMoney />}
                    color='info'
                    small
                    variant='text'
                >
                    <NewSale product={params.row} />
                </BasicModal>
            </>
        ,
    }
];

const TableInventory = (): ReactElement => {
    const [products, setProducts] = useState<Array<Object>>([]);

    useEffect((): void => {
        getFromDatabase('inventory').then((result: Array<Object>) => setProducts(result));
    });

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
