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
    const [selectedCustomer, setSelectedCustomer] = useState<customerObject>();
    const [newName, setNewName] = useState<string>('');

    useEffect((): void => {
        getFromDatabase('customers').then((result: Array<customerObject>) => setCustomerList(result));
    }, [status]);

    const handleCustomerSelection = (event: SelectChangeEvent<string>): void => {
        const id = event.target.value;

        const selected = getObjectFromArray(customerList, 'id', id);
        const moment = new Date(selected.date);
        selected.parsedDate = moment.toLocaleDateString() + ' às ' + moment.toLocaleTimeString();

        setSelectedCustomer(selected);
        setStatus(complexSituation.picked);
    };

    const checkSubmitReadiness = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = event.target.value;
        const currentName = selectedCustomer?.name;

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
        status >= complexSituation.picked && status != complexSituation.sent && customerList.length > 0
            ? selectedCustomer!.name
            : '';

    const loading: boolean = !!(status === complexSituation.sending);

    if (customerList.length > 0) {
        return (
            <div>
                <h1> Editar cadastro de cliente </h1>
                <p> {customerList.length} clientes cadastrados. </p>

                <div className='editScreen'>
                    <SelectDropdownInput
                        value={selectedCustomer?.id as string}
                        action={handleCustomerSelection}
                        list={customerList}
                        label='Selecionar cliente'
                    />

                    <> {status >= complexSituation.picked ? `Cadastrado em ${selectedCustomer!.parsedDate!}` : <></>} </>

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
