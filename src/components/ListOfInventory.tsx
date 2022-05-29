import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState, useEffect, ReactElement } from 'react'

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Produto',
        flex: 1
    },
    {
        field: 'default_price',
        headerName: 'Preço',
        width: 150
    },
    {
        field: 'quantity_in_stock',
        headerName: 'Estoque',
        width: 150
    }
];

const ListOfInventory = (): ReactElement => {
    const [inventory, set] = useState([])

    useEffect(() => {
        fetch('https://pablofsc-inventory-db.herokuapp.com/inventory', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                set(res)
            })
            .catch(e => console.log(e))
    })

    return (
        <div style={{ height: 600, width: '100%' }}>
            <h1>
                Estoque
            </h1>
            <DataGrid
                rows={inventory}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
            />
        </div>
    )
}

export default ListOfInventory