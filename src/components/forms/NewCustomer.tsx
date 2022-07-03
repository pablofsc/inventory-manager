import { useState, ReactElement } from 'react';

import { simpleSituation } from '../../utilities/utils';
import { addToDatabase } from '../../utilities/database';
import { databaseResponse } from '../../utilities/interfaces';

import GoBack from '../navigation/GoBack';
import NameInput from '../inputs/NameInput';
import ButtonInput from '../inputs/ButtonInput';

const NewClient = (): ReactElement => {
    const [status, setStatus] = useState<simpleSituation>(simpleSituation.incomplete);
    const [name, setName] = useState<string>('');

    const checkSubmitReadiness = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = event.target.value;

        input ? setStatus(simpleSituation.typed) : setStatus(simpleSituation.incomplete);

        setName(input);
    };

    const sendform = async (): Promise<void> => {
        setStatus(simpleSituation.sending);

        const serverResponse = await addToDatabase('newclient', { name: name });
        checkServerResponse(serverResponse);
    };

    const checkServerResponse = (response: databaseResponse): void => {
        response && response.results === 'success' ? setStatus(simpleSituation.sent) : setStatus(simpleSituation.error);
    };

    return (
        <div>
            <h1> Cadastrar novo cliente </h1>

            <div className='editScreen'>
                <NameInput id='newClientName' label='Nome completo do cliente' action={checkSubmitReadiness} />

                <ButtonInput
                    action={sendform}
                    loading={status === simpleSituation.sending}
                    disabled={status != simpleSituation.typed}
                    text='CADASTRAR'
                />
            </div>

            <p> {status === simpleSituation.sent ? 'Salvo com sucesso.' : <></>} </p>

            <GoBack />
        </div>
    );
};

export default NewClient;
