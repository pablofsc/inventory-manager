import { useState, ReactElement } from 'react';

import { DOM, simpleSituation } from '../../utilities/utils';
import { addToDatabase } from '../../utilities/database';
import { databaseResponse, productObject } from '../../utilities/interfaces';

import NameInput from '../inputs/NameInput';
import PriceInput from '../inputs/PriceInput';
import QuantityInput from '../inputs/QuantityInput';
import ButtonInput from '../inputs/ButtonInput';

const NewProduct = (): ReactElement => {
    const [status, setStatus] = useState<simpleSituation>(simpleSituation.incomplete);
    const [newProduct, setNewProduct] = useState<productObject>();

    const checkSubmitReadiness = () => {
        const name = DOM('productname')!.value;
        const price = DOM('productprice')!.value;
        const stock = DOM('initialstock')!.value;

        name && price && stock ? setStatus(simpleSituation.typed) : setStatus(simpleSituation.incomplete);

        setNewProduct({
            id: '-1',
            name: name,
            default_price: price,
            quantity_in_stock: stock,
        });
    };

    const sendform = async (): Promise<void> => {
        if (!newProduct) return;

        setStatus(simpleSituation.sending);

        const serverResponse = await addToDatabase('newproduct', newProduct);
        checkServerResponse(serverResponse);
    };

    const checkServerResponse = (response: databaseResponse): void => {
        response && response.results === 'success' ? setStatus(simpleSituation.sent) : setStatus(simpleSituation.error);
    };

    return (
        <div>
            <div className='editScreen'>
                <NameInput id='productname' label='Nome do produto' action={checkSubmitReadiness} />

                <PriceInput id='productprice' label='Preço sugerido' action={checkSubmitReadiness} />

                <QuantityInput id='initialstock' label='Estoque inicial' action={checkSubmitReadiness} />

                <ButtonInput
                    action={sendform}
                    loading={status === simpleSituation.sending}
                    disabled={status < simpleSituation.typed}
                    text='CADASTRAR'
                />
            </div>

            <p> {status === simpleSituation.sent ? 'Salvo com sucesso.' : <></>} </p>
        </div>
    );
};

export default NewProduct;
