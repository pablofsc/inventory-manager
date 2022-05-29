import { useState, useEffect, ReactElement } from 'react'
import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl } from "@mui/material"

import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { InputAdornment } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import GoBack from './GoBack';

const NewBatch = (): ReactElement => {
    const [sendingToDatabase, setSending] = useState(false)
    const [sentToDatabase, setSent] = useState(false)
    const [disableUpdateButton, setDisableUpdateButton] = useState(true)

    const [productList, setProductList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState<string>()
    const [addQuantity, setAddQuantity] = useState<string>()

    const handleProductSelection = (event: SelectChangeEvent): void => {
        setSent(false)
        const id = event.target.value
        setSelectedProduct(id as string)
    }

    const checkSubmitReadiness = (): void => {
        setSent(false)
        setAddQuantity((document.getElementById('newQuantity') as HTMLInputElement).value)

        if (!!selectedProduct) {
            setDisableUpdateButton(false)
        }
        else {
            setDisableUpdateButton(true)
        }
    }

    useEffect((): void => {
        fetch('https://pablofsc-inventory-db.herokuapp.com/inventory', { method: 'GET' })
            .then(res => res.json())
            .then(res => { setProductList(res) })
            .catch(e => console.log(e))
    }, [sentToDatabase])

    const sendUpdate = (): void => {
        if (!addQuantity) return

        setSending(true)

        fetch('https://pablofsc-inventory-db.herokuapp.com/updatestock', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: selectedProduct,
                quantity: parseInt(addQuantity)
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.results == 'success') { console.log('Successfully registered product update') }
                setSending(false)
                setSent(true)
                setDisableUpdateButton(true)
            })
            .catch(e => console.log(e))
    }
    if (productList.length > 0) {
        return (
            <div>
                <h1>
                    Registrar entrada de estoque
                </h1>
                <p>
                    {productList.length} produtos cadastrados.
                </p>

                {(productList.length > 0) ? <></> : <h3>Buscando dados no servidor...</h3>}

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '200px'
                }}>
                    <FormControl variant="filled" style={{ width: '30%' }}>
                        <InputLabel id="selectProduct">Selecionar produto</InputLabel>
                        <Select
                            id="selectProduct"
                            value={selectedProduct}
                            onChange={handleProductSelection}
                            key='selectProduct'
                        >
                            {productList.map((product: any) => (
                                <MenuItem value={product.id}>
                                    {product.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        id="newQuantity"
                        type='number'
                        label="Quantidade de estoque novo"
                        variant="filled"
                        InputProps={{ endAdornment: <InputAdornment position="end">unid.</InputAdornment>, }}
                        style={{ width: '30%' }}
                        onChange={checkSubmitReadiness}
                    />

                    <div style={{ display: 'flex' }}>
                        <LoadingButton
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={sendUpdate}
                            loading={sendingToDatabase}
                            loadingPosition="start"
                            disabled={!!disableUpdateButton}
                        >
                            ADICIONAR ESTOQUE
                        </LoadingButton>
                    </div>
                </div>

                <p>
                    {sentToDatabase ? 'Salvo com sucesso.' : <></>}
                </p>

                <GoBack />
            </div >
        )
    }
    else {
        return (
            <div>
                <h1>
                    Registrar entrada de estoque
                </h1>
                <p>
                    Nenhum produto cadastrado.
                </p>
            </div>
        )
    }
}

export default NewBatch