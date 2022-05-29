import { useState, useEffect, ReactElement } from 'react'

import { TextField, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl } from "@mui/material"
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import GoBack from './GoBack'

const EditClient = (): ReactElement => {
    const [sendingToDatabase, setSending] = useState(false)
    const [sentToDatabase, setSent] = useState(false)
    const [disableUpdateButton, setDisableUpdateButton] = useState(true)

    const [clientList, setClientList] = useState([])
    const [selectedClient, setSelectedClient] = useState<string>()
    const [newName, setNewName] = useState<string>()

    const handleClientSelection = (event: SelectChangeEvent): void => {
        setSelectedClient(event.target.value)
        setSent(false)
        setNewName(clientList.find((x: any) => x.id == event.target.value)!['name']) // placeholder na entrada de texto
    }

    const checkSubmitReadiness = (): void => {
        setSent(false)
        setNewName((document.getElementById('newName') as HTMLInputElement).value)
        if (newName && newName.length > 0 && !!selectedClient) {
            setDisableUpdateButton(false)
        }
        else {
            setDisableUpdateButton(true)
        }
    }

    useEffect((): void => {
        fetch('https://pablofsc-inventory-db.herokuapp.com/clients', { method: 'GET' })
            .then(res => res.json())
            .then(res => setClientList(res))
            .catch(e => console.log(e))
    }, [sentToDatabase])

    const sendUpdate = (): void => {
        setSending(true)
        fetch('https://pablofsc-inventory-db.herokuapp.com/updateclient', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: selectedClient,
                name: newName
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.results == 'success') { console.log('Successfully registered customer update') }
                else { console.log('Error: ', res) }
                setSending(false)
                setSent(true)
            })
            .catch(e => console.log(e))
    }

    const sendDeletion = (): void => {
        setSending(true)
        fetch('https://pablofsc-inventory-db.herokuapp.com/deleteclient', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: selectedClient, })
        })
            .then(res => res.json())
            .then(res => {
                if (res.results == 'success') { console.log('Successfully deleted customer') }
                else { console.log('Error: ', res) }
                setSending(false)
                setSent(true)
            })
            .catch(e => console.log(e))
    }

    if (clientList.length > 0) {
        return (
            <div>
                <h1>
                    Editar cadastro de cliente
                </h1>
                <p>
                    {clientList.length} clientes cadastrados.
                </p>


                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '200px'
                }}>
                    <FormControl variant="filled" style={{ width: '30%' }}>
                        <InputLabel id="selectClient">Selecionar cliente</InputLabel>
                        <Select
                            id="selectClient"
                            value={selectedClient}
                            onChange={handleClientSelection}
                            key='selectClient'
                        >
                            {clientList.map((client: any) => (
                                <MenuItem value={client.id}>
                                    {client.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        id="newName"
                        label="Nome atualizado"
                        variant="filled"
                        placeholder={newName}
                        onChange={checkSubmitReadiness}
                        style={{ width: '30%' }}
                    />

                    <div style={{ display: 'flex' }}>
                        <LoadingButton
                            color='error'
                            variant="contained"
                            startIcon={<DeleteForeverIcon />}
                            onClick={sendDeletion}
                            loading={sendingToDatabase}
                            loadingPosition="start"
                            disabled={!!!selectedClient}
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

                <GoBack />
            </div >
        )
    }
    else {
        return (
            <div>
                <h1>
                    Editar cadastro de cliente
                </h1>
                <p>
                    Nenhum cliente cadastrado.
                </p>

                <GoBack />
            </div>
        )
    }
}

export default EditClient