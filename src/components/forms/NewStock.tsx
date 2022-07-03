import { useState, useEffect, ReactElement } from 'react';

import { SelectChangeEvent } from '@mui/material';

import { complexSituation, getObjectFromArray } from '../../utilities/utils';
import { getFromDatabase, updateDatabase } from '../../utilities/database';
import { databaseResponse, productObject } from '../../utilities/interfaces';

import GoBack from '../navigation/GoBack';
import ButtonInput from '../inputs/ButtonInput';
import QuantityInput from '../inputs/QuantityInput';
import SelectDropdownInput from '../inputs/SelectDropdownInput';

const NewStock = (): ReactElement => {
    const [status, setStatus] = useState<complexSituation>(complexSituation.notPicked);
    const [productList, setProductList] = useState<Array<productObject>>([]);

    const [selectedProductID, setSelectedProduct] = useState<string>('');
    const [amountToAdd, setAmountToAdd] = useState<number>();

    useEffect((): void => {
        getFromDatabase('inventory').then((result: Array<productObject>) => setProductList(result));
    }, [status]);

    const handleProductSelection = (event: SelectChangeEvent): void => {
        setSelectedProduct(event.target.value);
        status >= complexSituation.picked ? null : setStatus(complexSituation.picked);
    };

    const checkSubmitReadiness = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = event.target.value;
        input ? setStatus(complexSituation.typed) : setStatus(complexSituation.picked);
        setAmountToAdd(parseInt(event.target.value));
    };

    const sendUpdate = async (): Promise<void> => {
        setStatus(complexSituation.sending);

        const serverResponse = await updateDatabase('updatestock', {
            id: selectedProductID,
            quantity: amountToAdd,
        });
        checkServerResponse(serverResponse);
    };

    const checkServerResponse = (response: databaseResponse): void => {
        response && response.results === 'success'
            ? setStatus(complexSituation.sent)
            : setStatus(complexSituation.error);
    };

    const currentStock =
        status >= complexSituation.picked
            ? 'Estoque atual: ' + getObjectFromArray(productList, 'id', selectedProductID).quantity_in_stock
            : 'Selecione um produto';

    if (productList.length > 0) {
        return (
            <div>
                <h1> Registrar entrada de estoque </h1>
                <p> {productList.length} produtos cadastrados. </p>

                <div className='editScreen'>
                    <SelectDropdownInput
                        value={selectedProductID}
                        action={handleProductSelection}
                        list={productList}
                        label='Selecionar produto'
                    />

                    {currentStock}

                    <QuantityInput
                        id='newQuantity'
                        label='Quantidade de estoque novo'
                        action={checkSubmitReadiness}
                        disabled={status < complexSituation.picked}
                    />

                    <ButtonInput
                        action={sendUpdate}
                        loading={status === complexSituation.sending}
                        disabled={status < complexSituation.typed}
                        text='ADICIONAR ESTOQUE'
                    />
                </div>

                <p> {status === complexSituation.sent ? 'Salvo com sucesso.' : <></>} </p>

                <GoBack />
            </div>
        );
    } else {
        return (
            <div>
                <h1> Registrar entrada de estoque </h1>
                <p> Nenhum produto cadastrado. </p>
            </div>
        );
    }
};

export default NewStock;
