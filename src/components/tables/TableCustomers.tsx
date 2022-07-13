import { DataGrid, GridColDef, GridSortItem } from '@mui/x-data-grid';
import { useState, useEffect, ReactElement } from 'react';

import { AttachMoney, Edit } from '@mui/icons-material';

import { getFromDatabase } from '../../utilities/database';
import { customerObject } from '../../utilities/interfaces';

import BasicModal from '../modals/BasicModal';
import EditCustomer from '../forms/EditCustomer';
import NewSale from '../forms/NewSale';

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
    {
        field: 'edit',
        headerName: 'Ações',
        width: 140,
        renderCell: (params) =>
            <>
                <BasicModal
                    icon={<Edit />}
                    title={`EDITANDO ${params.row.name.toUpperCase()}`}
                    color='info'
                    small
                    variant='text'
                >
                    <EditCustomer customer={params.row} />
                </BasicModal>

                <BasicModal
                    title={`REGISTRANDO VENDA PARA ${params.row.name.toUpperCase()}`}
                    icon={<AttachMoney />}
                    color='info'
                    small
                    variant='text'
                >
                    <NewSale customer={params.row} />
                </BasicModal>
            </>
        ,
    }
];

const TableCustomers = (): ReactElement => {
    const [customers, setCustomers] = useState<Array<customerObject>>([]);

    useEffect((): void => {
        getFromDatabase('customers').then((result: Array<any>) => {
            for (let saleIndex = 0; saleIndex < result.length; saleIndex++) {
                const moment = new Date(result[saleIndex].date);
                result[saleIndex].parsedDate = moment.toLocaleDateString() + ' às ' + moment.toLocaleTimeString();
            }
            setCustomers(result);
        });
    });

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
