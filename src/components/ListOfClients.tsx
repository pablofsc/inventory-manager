import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Nome do cliente',
        flex: 1
    },
];

const ListOfClients = () => {
    const [inventory, set] = useState([])

    useEffect(() => {
        const id = setInterval(() => {
            fetch('https://pablofsc-inventory-db.herokuapp.com/clients', {
                method: 'GET'
            })
                .then(res => res.json())
                .then(res => {
                    set(res)
                })
                .catch(e => console.log(e))
        }, 500)

        return () => clearInterval(id);
    })

    return (
        <div style={{ height: 600, width: '100%' }}>
            <h1>
                Clientes cadastrados
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

export default ListOfClients