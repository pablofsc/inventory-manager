import { useState, useEffect, ReactElement } from 'react';

import { complexSituation } from '../../utilities/utils';
import { deleteFromDatabase, updateDatabase } from '../../utilities/database';
import { customerObject, databaseResponse } from '../../utilities/interfaces';

import NameInput from '../inputs/NameInput';
import ButtonInput from '../inputs/ButtonInput';

import { Paper } from '@mui/material';

interface Properties {
    customer: customerObject;
}

const EditCustomer = (props: Properties): ReactElement => {
    const [status, setStatus] = useState<complexSituation>(complexSituation.notPicked);
    const [selectedCustomer, setSelectedCustomer] = useState<customerObject>();
    const [newName, setNewName] = useState<string>('');

    useEffect((): void => {
        setSelectedCustomer(props.customer);
        setStatus(complexSituation.picked);
    }, []);

    const checkSubmitReadiness = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = event.target.value;
        const currentName = props.customer.name;

        if (!input || input === currentName) {
            setStatus(complexSituation.picked);
            return;
        }

        setStatus(complexSituation.typed);
        setNewName(input);
    };

    const sendUpdate = async (): Promise<void> => {
        setStatus(complexSituation.sending);

        const serverResponse = await updateDatabase('updatecustomer', {
            id: selectedCustomer!.id,
            name: newName,
        });

        checkServerResponse(serverResponse);
    };

    const sendDeletion = async (): Promise<void> => {
        setStatus(complexSituation.sending);

        const serverResponse = await deleteFromDatabase('deletecustomer', { id: selectedCustomer!.id });

        checkServerResponse(serverResponse);
    };

    const checkServerResponse = (response: databaseResponse): void => {
        response && response.results === 'success'
            ? setStatus(complexSituation.sent)
            : setStatus(complexSituation.error);
    };

    const inputPlaceholder: string =
        status >= complexSituation.picked && status != complexSituation.sent
            ? selectedCustomer!.name
            : '';

    const loading: boolean = !!(status === complexSituation.sending);

    return (
        <div className='editScreen'>
            <Paper variant='outlined' style={{ paddingLeft: '20px', textAlign: 'left' }}>
                <p>Nome: {selectedCustomer?.name}</p>
                <p>ID: #{selectedCustomer?.id}</p>
                <p>Data de cadastro: {selectedCustomer?.parsedDate}</p>
            </Paper>

            <NameInput
                id='newName'
                label='Alterar nome'
                placeholder={inputPlaceholder}
                action={checkSubmitReadiness}
            />

            <div>
                <ButtonInput
                    action={sendDeletion}
                    loading={loading}
                    disabled={status < complexSituation.picked}
                    isDeleteVariant
                />

                <ButtonInput
                    action={sendUpdate}
                    loading={loading}
                    disabled={status != complexSituation.typed}
                />
            </div>

            <p> {status === complexSituation.sent ? 'Salvo com sucesso.' : <></>} </p>
        </div>
    );
};

export default EditCustomer;
