import { useState, useEffect, ReactElement } from 'react';

import { Paper, SelectChangeEvent } from '@mui/material';

import { complexSituation, getObjectFromArray } from '../../utilities/utils';
import { getFromDatabase, updateDatabase } from '../../utilities/database';
import { databaseResponse, productObject } from '../../utilities/interfaces';

import ButtonInput from '../inputs/ButtonInput';
import QuantityInput from '../inputs/QuantityInput';
import SelectDropdownInput from '../inputs/SelectDropdownInput';

interface Properties {
    product?: productObject;
}

const NewStock = (props: Properties): ReactElement => {
    const [status, setStatus] = useState<complexSituation>(complexSituation.notPicked);
    const [productList, setProductList] = useState<Array<productObject>>([]);

    const [selectedProductID, setSelectedProduct] = useState<string>(props.product?.id || '');
    const [amountToAdd, setAmountToAdd] = useState<number>();

    useEffect((): void => {
        getFromDatabase('inventory').then((result: Array<productObject>) => {
            setProductList(result);
            status === complexSituation.notPicked && props.product ? setStatus(complexSituation.picked) : '';
        });
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

    return (
        <div>
            {props.product ? ' ' : <p> {productList.length} produtos cadastrados. </p>}

            <div className='editScreen'>
                {props.product
                    ?
                    <Paper variant='outlined' style={{ paddingLeft: '20px', textAlign: 'left' }}>
                        <p>Nome: {props.product?.name}</p>
                        <p>Estoque atual: {props.product.quantity_in_stock}</p>
                    </Paper>
                    :
                    <>
                        <SelectDropdownInput
                            value={selectedProductID}
                            action={handleProductSelection}
                            list={productList}
                            label='Selecionar produto'
                        />

                        <Paper variant='outlined' style={{ padding: '20px 0' }}>
                            {currentStock}
                        </Paper>
                    </>
                }

                <QuantityInput
                    id='newQuantity'
                    label='Quantidade de estoque novo'
                    action={checkSubmitReadiness}
                    disabled={status < complexSituation.picked}
                />

                <ButtonInput
                    action={sendUpdate}
                    loading={status === complexSituation.sending}
                    disabled={status < complexSituation.typed || amountToAdd! <= 0}
                    text='ADICIONAR ESTOQUE'
                />
            </div>

            <p> {status === complexSituation.sent ? 'Salvo com sucesso.' : <></>} </p>
        </div>
    );
};

export default NewStock;
