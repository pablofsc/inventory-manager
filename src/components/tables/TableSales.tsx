import { DataGrid, GridColDef, GridSortItem } from '@mui/x-data-grid';
import { useState, useEffect, ReactElement } from 'react';

import { getFromDatabase } from '../../utilities/database';

const columns: GridColDef[] = [
    {
        field: 'product_name',
        headerName: 'Produto',
        flex: 1,
    },
    {
        field: 'customer_name',
        headerName: 'Cliente',
        flex: 1,
    },
    {
        field: 'quantity',
        headerName: 'Quantidade',
        width: 150,
    },
    {
        field: 'price',
        headerName: 'Preço',
        width: 150,
    },
    {
        field: 'date',
        headerName: 'Data',
        width: 200,
        hide: true
    },
    {
        field: 'parsedDate',
        headerName: 'Data',
        width: 200,
    },
];

const TableSales = (): ReactElement => {
    const [sales, setSales] = useState<Array<Object>>([]);

    useEffect((): void => {
        getFromDatabase('sales').then((result: Array<any>) => {
            for (let saleIndex = 0; saleIndex < result.length; saleIndex++) {
                const moment = new Date(result[saleIndex].date);
                result[saleIndex].parsedDate = moment.toLocaleDateString() + ' às ' + moment.toLocaleTimeString();

                if (!result[saleIndex].customer_name)
                    result[saleIndex].customer_name = result[saleIndex].deleted_customer_name + ' (excluído)';
                if (!result[saleIndex].product_name)
                    result[saleIndex].product_name = result[saleIndex].deleted_product_name + ' (excluído)';
            }
            setSales(result);
        });
    }, []);

    const [sortModel, setSortModel] = useState<Array<GridSortItem>>([
        {
            field: 'date',
            sort: 'desc',
        },
    ]);

    return (
        <div className='tableParent'>
            <h1>Histórico de vendas</h1>
            <DataGrid
                rows={sales}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
            />
        </div>
    );
};

export default TableSales;
