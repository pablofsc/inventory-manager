import { Inventory } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'

const columns: GridColDef[] = [
    {
        field: 'product',
        headerName: 'Produto',
        flex: 1
    },
    {
        field: 'client',
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
        field: 'total',
        headerName: 'Total',
        width: 150
    }
];

const ListOfSales = () => {
    const [sales, setSales] = useState([])
    const [clients, setClients] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        const id1 = setInterval(() => {
            fetch('https://pablofsc-inventory-db.herokuapp.com/sales', {
                method: 'GET'
            })
                .then(res => res.json())
                .then(res => {
                    setSales(res)
                })
                .catch(e => console.log(e))
        }, 500)

        let list = [...sales]

        const id2 = setInterval(() => {
            fetch('https://pablofsc-inventory-db.herokuapp.com/clients', {
                method: 'GET'
            })
                .then(res => res.json())
                .then(res => {
                    setClients(res)
                })
                .catch(e => console.log(e))
        }, 500)


        const id3 = setInterval(() => {
            fetch('https://pablofsc-inventory-db.herokuapp.com/inventory', {
                method: 'GET'
            })
                .then(res => res.json())
                .then(res => {
                    setProducts(res)
                })
                .catch(e => console.log(e))
        }, 500)

        for (let i = 0; i < list.length; i++) {
            try {
                list[i]['product'] = products.find((x: any) => x.id === sales[i]['product_id'])!['name']
                list[i]['client'] = clients.find((x: any) => x.id === sales[i]['client_id'])!['name']

                const total = sales[i]['quantity'] * parseFloat((sales[i]['price'] as String).substring(1).replaceAll(',', ''))
                list[i]['total'] = ('$' + total) as never
            } catch (e) {
                console.log(e)
            }
        }

        return () => {
            clearInterval(id1);
            clearInterval(id2);
            clearInterval(id3);
        }
    })

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
    )
}

export default ListOfSales