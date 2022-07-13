import { useState, useEffect, ReactElement } from 'react';

import { Paper } from '@mui/material';

import { DOM, parsePrice, complexSituation } from '../../utilities/utils';
import { deleteFromDatabase, updateDatabase } from '../../utilities/database';
import { productObject, databaseResponse } from '../../utilities/interfaces';

import NameInput from '../inputs/NameInput';
import ButtonInput from '../inputs/ButtonInput';
import PriceInput from '../inputs/PriceInput';
import QuantityInput from '../inputs/QuantityInput';

interface Properties {
    product: productObject;
}

const EditProduct = (props: Properties): ReactElement => {
    const [status, setStatus] = useState<complexSituation>(complexSituation.notPicked);

    const [newName, setNewName] = useState<string>('');
    const [newPrice, setNewPrice] = useState<string>('');
    const [newQuantity, setNewQuantity] = useState<string>('');

    useEffect((): void => {
        const parsedPrice = parsePrice(props.product.default_price);

        DOM('newName')!.value = props.product.name;
        DOM('newName')!.placeholder = props.product.name;

        DOM('newPrice')!.value = parsedPrice;
        DOM('newPrice')!.placeholder = parsedPrice;

        DOM('newQuantity')!.value = props.product.quantity_in_stock;
        DOM('newQuantity')!.placeholder = props.product.quantity_in_stock;

        setStatus(complexSituation.picked);
    }, []);

    const checkSubmitReadiness = (): void => {
        const name = DOM('newName')!.value;
        const price = DOM('newPrice')!.value;
        const quantity = DOM('newQuantity')!.value;

        if (
            (name && name != props.product.name) ||
            (price && price != parsePrice(props.product.default_price)) ||
            (quantity && quantity != props.product.quantity_in_stock)
        )
            setStatus(complexSituation.typed);
        else setStatus(complexSituation.picked);

        setNewName(name);
        setNewPrice(price);
        setNewQuantity(quantity);
    };

    const sendUpdate = async (): Promise<void> => {
        setStatus(complexSituation.sending);

        props.product.id = props.product.id;
        props.product.name = newName;
        props.product.default_price = newPrice;
        props.product.quantity_in_stock = newQuantity;

        const serverResponse = await updateDatabase('updateproduct', props.product);

        checkServerResponse(serverResponse);
        setStatus(complexSituation.picked);
    };

    const sendDeletion = async (): Promise<void> => {
        setStatus(complexSituation.sending);

        const serverResponse = await deleteFromDatabase('deleteproduct', { id: props.product.id });
        checkServerResponse(serverResponse);

        setStatus(complexSituation.sent);
    };

    const checkServerResponse = (response: databaseResponse): void => {
        response && response.results === 'success'
            ? setStatus(complexSituation.sent)
            : setStatus(complexSituation.error);
    };

    const loading = status === complexSituation.sending;

    return (
        <div>
            <div className='editScreen'>
                <Paper variant='outlined' style={{ paddingLeft: '20px', textAlign: 'left' }}>
                    <p>Nome: {props.product.name}</p>
                    <p>ID: {props.product.id}</p>
                    <p>Preço sugerido atual: {props.product.default_price}</p>
                    <p>Estoque: {props.product.quantity_in_stock}</p>
                </Paper>

                <NameInput id='newName' label='Novo nome' action={checkSubmitReadiness} />

                <div className='priceQuantityCouple'>
                    <PriceInput
                        id='newPrice'
                        label='Novo preço'
                        action={checkSubmitReadiness}
                    />

                    <QuantityInput
                        id='newQuantity'
                        label='Estoque'
                        action={checkSubmitReadiness}
                    />
                </div>

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
        </div>
    );
};

export default EditProduct;
