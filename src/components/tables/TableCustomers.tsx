import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect, ReactElement } from 'react';

import { getFromDatabase } from '../../utilities/database';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Nome do cliente',
        flex: 1
    },
];

const TableCustomers = (): ReactElement => {
    const [customers, setCustomers] = useState<Array<Object>>([]);

    useEffect((): void => {
        getFromDatabase('clients').then((result: Array<Object>) => setCustomers(result));
    }, []);

    return (
        <div className='tableParent'>
            <h1>
                Clientes cadastrados
            </h1>
            <DataGrid
                rows={customers}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
            />
        </div>
    );
};

export default TableCustomers;