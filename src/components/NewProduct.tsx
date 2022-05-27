import { useState } from 'react'

import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { InputAdornment } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const NewProduct = () => {
    let [loading, setLoading] = useState(false)

    const sendform = () => {
        let name = (document.getElementById('productname') as HTMLInputElement).value
        let price = (document.getElementById('productprice') as HTMLInputElement).value
        let quantity = (document.getElementById('initialstock') as HTMLInputElement).value

        if (name && price && quantity) {
            setLoading(true)
            fetch('https://pablofsc-inventory-db.herokuapp.com/newproduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    price: price,
                    quantity: quantity
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.results == 'success') {
                        console.log('sent new product to database')
                        setLoading(false)
                    }
                })
                .catch(e => console.log(e))
        }
    }

    return (
        <div>
            <h1>
                Cadastrar novo produto
            </h1>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '150px'
            }}>
                <TextField
                    id="productname"
                    label="Nome do produto"
                    variant="filled"
                    style={{
                        width: '50%'
                    }}
                />

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '50%'
                }}>
                    <TextField
                        id="productprice"
                        label="Preço sugerido"
                        variant="filled"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }}
                        style={{
                            width: '35%'
                        }}
                    />
                    <TextField
                        id="initialstock"
                        label="Estoque inicial"
                        variant="filled"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">unid.</InputAdornment>,
                        }}
                        style={{
                            width: '35%'
                        }}
                    />
                    <LoadingButton
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={sendform}
                        loading={loading}
                        loadingPosition="start"
                    >
                        CADASTRAR
                    </LoadingButton>
                </div>
            </div>
        </div >
    )
}

export default NewProduct