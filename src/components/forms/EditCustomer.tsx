import { useState, useEffect, ReactElement } from 'react';

import { SelectChangeEvent } from '@mui/material';

import { getObjectFromArray, complexSituation } from '../../utilities/utils';
import { deleteFromDatabase, getFromDatabase, updateDatabase } from '../../utilities/database';
import { customerObject, databaseResponse } from '../../utilities/interfaces';

import GoBack from '../navigation/GoBack';
import NameInput from '../inputs/NameInput';
import ButtonInput from '../inputs/ButtonInput';
import SelectDropdownInput from '../inputs/SelectDropdownInput';

const EditCustomer = (): ReactElement => {
    const [status, setStatus] = useState<complexSituation>(complexSituation.notPicked);
    const [customerList, setCustomerList] = useState<Array<customerObject>>([]);
    const [selectedID, setSelectedID] = useState<string>('');
    const [newName, setNewName] = useState<string>('');

    useEffect((): void => {
        getFromDatabase('customers').then((result: Array<customerObject>) => setCustomerList(result));
    }, [status]);

    const handleCustomerSelection = (event: SelectChangeEvent<string>): void => {
        setSelectedID(event.target.value);
        setStatus(complexSituation.picked);
    };

    const checkSubmitReadiness = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = event.target.value;
        const currentName = getObjectFromArray(customerList, 'id', selectedID).name;

        if (!input || input === currentName) {
            setStatus(complexSituation.picked);
            return;
        }

        setNewName(input);
        setStatus(complexSituation.typed);
    };

    const sendUpdate = async (): Promise<void> => {
        setStatus(complexSituation.sending);

        const serverResponse = await updateDatabase('updatecustomer', {
            id: selectedID,
            name: newName,
        });
        checkServerResponse(serverResponse);
    };

    const sendDeletion = async (): Promise<void> => {
        setStatus(complexSituation.sending);

        const serverResponse = await deleteFromDatabase('deletecustomer', { id: selectedID });
        checkServerResponse(serverResponse);
    };

    const checkServerResponse = (response: databaseResponse): void => {
        response && response.results === 'success'
            ? setStatus(complexSituation.sent)
            : setStatus(complexSituation.error);
    };

    const inputPlaceholder: string =
        status >= complexSituation.picked && status != complexSituation.sent && customerList.length > 0
            ? getObjectFromArray(customerList, 'id', selectedID).name
            : '';

    const loading: boolean = !!(status === complexSituation.sending);

    if (customerList.length > 0) {
        return (
            <div>
                <h1> Editar cadastro de cliente </h1>
                <p> {customerList.length} clientes cadastrados. </p>

                <div className='editScreen'>
                    <SelectDropdownInput
                        value={selectedID}
                        action={handleCustomerSelection}
                        list={customerList}
                        label='Selecionar cliente'
                    />

                    <NameInput
                        id='newName'
                        label='Novo nome'
                        placeholder={inputPlaceholder}
                        action={checkSubmitReadiness}
                        disabled={status < complexSituation.picked}
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
                </div>

                <p> {status === complexSituation.sent ? 'Salvo com sucesso.' : <></>} </p>
                <p> {status === complexSituation.error ? 'Houve um erro e as alterações não foram salvas.' : <></>} </p>

                <GoBack />
            </div>
        );
    } else {
        return (
            <div>
                <h1> Editar cadastro de cliente </h1>
                <p> Nenhum cliente cadastrado. </p>
                <GoBack />
            </div>
        );
    }
};

export default EditCustomer;
