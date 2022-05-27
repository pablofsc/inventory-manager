import { useState } from 'react'

import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

const NewClient = () => {
    let [loading, setLoading] = useState(false)

    const sendform = () => {
        let input = (document.getElementById('newClientName') as HTMLInputElement).value

        if (input) {
            setLoading(true)
            fetch('https://pablofsc-inventory-db.herokuapp.com/newclient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: input
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.results == 'success') {
                        console.log('sent new user to database')
                        setLoading(false)
                    }
                })
                .catch(e => console.log(e))
        }
    }

    return (
        <div>
            <h1>
                Cadastrar novo cliente
            </h1>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <TextField
                    id="newClientName"
                    label="Nome completo do cliente"
                    variant="filled"
                    style={{
                        width: '50%'
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
    )
}

export default NewClient