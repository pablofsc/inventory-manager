import { useState, useEffect } from 'react'
import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl } from "@mui/material"

import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { InputAdornment } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const EditProduct = () => {
    const [sendingToDatabase, setSending] = useState(false)
    const [sentToDatabase, setSent] = useState(false)
    const [disableUpdateButton, setDisableUpdateButton] = useState(true)

    const [productList, setProductList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState<string>()
    const [newName, setNewName] = useState<string>()
    const [newPrice, setNewPrice] = useState<string>()
    const [newQuantity, setNewQuantity] = useState<string>()

    const handleProductSelection = (event: SelectChangeEvent): void => {
        setSent(false)
        const id = event.target.value
        setSelectedProduct(id as string)

        setNewName(productList.find((x: any) => x.id == id)!['name'])
        setNewPrice((productList.find((x: any) => x.id == id)!['default_price'] as string).substring(1).replaceAll(',', ''))
        setNewQuantity(productList.find((x: any) => x.id == id)!['quantity_in_stock']);

        (document.getElementById('newName') as HTMLInputElement).value = productList.find((x: any) => x.id == id)!['name'];
        (document.getElementById('newPrice') as HTMLInputElement).value = (productList.find((x: any) => x.id == id)!['default_price'] as string).substring(1).replaceAll(',', '');
        (document.getElementById('newQuantity') as HTMLInputElement).value = productList.find((x: any) => x.id == id)!['quantity_in_stock'];
    }

    const checkSubmitReadiness = (): void => {
        setSent(false)
        setNewName((document.getElementById('newName') as HTMLInputElement).value)
        setNewPrice((document.getElementById('newPrice') as HTMLInputElement).value)
        setNewQuantity((document.getElementById('newQuantity') as HTMLInputElement).value)

        if (!!selectedProduct) {
            setDisableUpdateButton(false)
        }
        else if (
            newName && newName.length === 0 &&
            newPrice && newPrice.length === 0 &&
            newQuantity && newQuantity.length === 0) {
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
        setSending(true)
        fetch('https://pablofsc-inventory-db.herokuapp.com/updateproduct', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: selectedProduct,
                name: newName,
                price: newPrice,
                quantity: newQuantity
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

    const sendDeletion = (): void => {
        setSending(true)
        fetch('https://pablofsc-inventory-db.herokuapp.com/deleteproduct', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: selectedProduct, })
        })
            .then(res => res.json())
            .then(res => {
                if (res.results == 'success') { console.log('Successfully deleted product') }
                else { console.log('Error: ', res) }
                setSending(false)
                setSent(true)
            })
            .catch(e => console.log(e))
    }

    if (productList.length > 0) {
        return (
            <div>
                <h1>
                    Editar cadastro de produto
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
                    height: '300px'
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
                        id="newName"
                        label="Novo nome"
                        variant="filled"
                        placeholder={newName}
                        style={{ width: '30%' }}
                        onChange={checkSubmitReadiness}
                        InputLabelProps={{ shrink: !!newName }}
                    />

                    <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between' }}>
                        <TextField
                            id="newPrice"
                            label="Novo preço"
                            variant="filled"
                            placeholder={newPrice}
                            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                            style={{ width: '45%' }}
                            onChange={checkSubmitReadiness}
                        />

                        <TextField
                            id="newQuantity"
                            label="Estoque"
                            variant="filled"
                            placeholder={newQuantity}
                            InputProps={{ endAdornment: <InputAdornment position="end">unid.</InputAdornment>, }}
                            style={{ width: '45%' }}
                            onChange={checkSubmitReadiness}
                            InputLabelProps={{ shrink: !!newQuantity }}
                        />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <LoadingButton
                            color='error'
                            variant="contained"
                            startIcon={<DeleteForeverIcon />}
                            onClick={sendDeletion}
                            loading={sendingToDatabase}
                            loadingPosition="start"
                            disabled={!!!selectedProduct}
                        >
                            EXCLUIR
                        </LoadingButton>
                        <LoadingButton
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={sendUpdate}
                            loading={sendingToDatabase}
                            loadingPosition="start"
                            disabled={!!disableUpdateButton}
                        >
                            ATUALIZAR
                        </LoadingButton>
                    </div>
                </div>

                <p>
                    {sentToDatabase ? 'Salvo com sucesso.' : <></>}
                </p>
            </div >
        )
    }
    else {
        return (
            <div>
                <h1>
                    Editar cadastro de produto
                </h1>
                <p>
                    Nenhum produto cadastrado.
                </p>
            </div>
        )
    }
}

export default EditProduct