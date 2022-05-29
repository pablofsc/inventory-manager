import { useState, useEffect, ReactElement } from 'react'
import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl } from "@mui/material"

import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { InputAdornment } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import GoBack from './GoBack';

const NewSale = (): ReactElement => {
    const [loading, setLoading] = useState(false)

    // CLIENTES
    const [selectedClient, setSC] = useState('')
    const [clientList, setCL] = useState([])

    const handleChangeC = (event: SelectChangeEvent) => {
        setSC(event.target.value as string)
    };

    useEffect(() => {
        const id = setInterval(() => {
            fetch('https://pablofsc-inventory-db.herokuapp.com/clients', {
                method: 'GET'
            })
                .then(res => res.json())
                .then(res => {
                    setCL(res)
                })
                .catch(e => console.log(e))
        }, 1000)

        return () => clearInterval(id);
    })

    // PRODUTOS 
    const [selectedProduct, setSP] = useState('')
    const [productList, setPL] = useState([])
    const [suggestedPrice, setPrice] = useState('')

    const handleChangeP = (event: SelectChangeEvent) => {
        setSP(event.target.value as string)

        let price: String = productList[productList.findIndex((x: any) => x.id == event.target.value)]['default_price'];
        setPrice(price.substring(1))
    };

    useEffect(() => {
        const id = setInterval(() => {
            fetch('https://pablofsc-inventory-db.herokuapp.com/inventory', {
                method: 'GET'
            })
                .then(res => res.json())
                .then(res => {
                    setPL(res)
                })
                .catch(e => console.log(e))
        }, 1000)

        return () => clearInterval(id);
    })

    const sendform = () => {
        let client = selectedClient
        let product = selectedProduct
        let price = ((document.getElementById('price') as HTMLInputElement).value).replace(',', '.')
        let quantity = (document.getElementById('quantity') as HTMLInputElement).value

        if (client && product && price && quantity) {
            setLoading(true)
            fetch('https://pablofsc-inventory-db.herokuapp.com/newsale', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: product,
                    client: client,
                    quantity: parseInt(quantity),
                    price: price,
                    date: '2022-05-27'
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.results == 'success') {
                        console.log('sent new sale to database')
                    }
                    setLoading(false)
                })
                .catch(e => console.log(e))
        }
    }

    return (
        <div>
            <h1>
                Registrar venda
            </h1>

            {(productList.length > 0 && clientList.length > 0) ? <></> : <h3>Buscando dados no servidor...</h3>}

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '300px',
                marginBottom: '20px'
            }}>
                <FormControl variant="filled" style={{ width: '30%' }}>
                    <InputLabel id="selectClient">Selecionar cliente</InputLabel>
                    <Select
                        id="selectClient"
                        value={selectedClient}
                        onChange={handleChangeC}
                        key='selectClient'
                    >
                        {clientList.map((client: any) => (
                            <MenuItem value={client.id}>
                                {client.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="filled" style={{ width: '30%' }}>
                    <InputLabel id="selectProduct">Selecionar produto</InputLabel>
                    <Select
                        id="selectProduct"
                        value={selectedProduct}
                        onChange={handleChangeP}
                        key='selectProduct'
                    >
                        {productList.map((product: any) => (
                            <MenuItem value={product.id}>
                                {product.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        id="price"
                        type='number'
                        label="Preço da venda"
                        variant="filled"
                        placeholder={suggestedPrice}
                        InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                        style={{ width: '45%' }}
                    />

                    <TextField
                        id="quantity"
                        type='number'
                        label="Quantidade"
                        variant="filled"
                        InputProps={{ endAdornment: <InputAdornment position="end">unid.</InputAdornment>, }}
                        style={{ width: '45%' }}
                    />
                </div>

                <LoadingButton
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={sendform}
                    loading={loading}
                    loadingPosition="start"
                >
                    REGISTRAR VENDA
                </LoadingButton>
            </div>

            <GoBack />
        </div >
    )
}

export default NewSale