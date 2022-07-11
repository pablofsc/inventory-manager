import { DataGrid, GridColDef, GridSortItem } from '@mui/x-data-grid';
import { useState, useEffect, ReactElement } from 'react';

import { getFromDatabase } from '../../utilities/database';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Nome do cliente',
        flex: 1,
    },
    {
        field: 'parsedDate',
        headerName: 'Data de cadastro',
        width: 200,
    },
];

const TableCustomers = (): ReactElement => {
    const [customers, setCustomers] = useState<Array<Object>>([]);

    useEffect((): void => {
        getFromDatabase('customers').then((result: Array<any>) => {
            for (let saleIndex = 0; saleIndex < result.length; saleIndex++) {
                const moment = new Date(result[saleIndex].date);
                result[saleIndex].parsedDate = moment.toLocaleDateString() + ' às ' + moment.toLocaleTimeString();
            }
            setCustomers(result);
        });
    }, []);

    const [sortModel, setSortModel] = useState<Array<GridSortItem>>([
        {
            field: 'name',
            sort: 'asc',
        },
    ]);

    return (
        <div className='tableParent'>
            <h1>Clientes cadastrados</h1>
            <DataGrid
                rows={customers}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
            />
        </div>
    );
};

export default TableCustomers;
