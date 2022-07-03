import { useState, useEffect, ReactElement } from 'react';

import { SelectChangeEvent } from '@mui/material';

import { getObjectFromArray, DOM, parsePrice, complexSituation } from '../../utilities/utils';
import { deleteFromDatabase, getFromDatabase, updateDatabase } from '../../utilities/database';
import { productObject, databaseResponse } from '../../utilities/interfaces';

import GoBack from '../navigation/GoBack';
import NameInput from '../inputs/NameInput';
import ButtonInput from '../inputs/ButtonInput';
import PriceInput from '../inputs/PriceInput';
import QuantityInput from '../inputs/QuantityInput';
import SelectDropdownInput from '../inputs/SelectDropdownInput';

const EditProduct = (): ReactElement => {
    const [status, setStatus] = useState<complexSituation>(complexSituation.notPicked);
    const [productList, setProductList] = useState<Array<productObject>>([]);

    const [selectedID, setSelectedID] = useState<string>('');
    const [newName, setNewName] = useState<string>('');
    const [newPrice, setNewPrice] = useState<string>('');
    const [newQuantity, setNewQuantity] = useState<string>('');

    useEffect((): void => {
        getFromDatabase('inventory').then((result: Array<productObject>) => setProductList(result));
    }, [status]);

    const handleProductSelection = (event: SelectChangeEvent<string>): void => {
        const id = event.target.value;
        const picked = getObjectFromArray(productList, 'id', id);

        const parsedPrice = parsePrice(picked.default_price);

        DOM('newName')!.value = picked.name;
        DOM('newName')!.placeholder = picked.name;

        DOM('newPrice')!.value = parsedPrice;
        DOM('newPrice')!.placeholder = parsedPrice;

        DOM('newQuantity')!.value = picked.quantity_in_stock;
        DOM('newQuantity')!.placeholder = picked.quantity_in_stock;

        setSelectedID(id);
        setStatus(complexSituation.picked);
    };

    const checkSubmitReadiness = (): void => {
        const name = DOM('newName')!.value;
        const price = DOM('newPrice')!.value;
        const quantity = DOM('newQuantity')!.value;

        const picked = getObjectFromArray(productList, 'id', selectedID);

        if (
            (name && name != picked.name) ||
            (price && price != parsePrice(picked.default_price)) ||
            (quantity && quantity != picked.quantity_in_stock)
        )
            setStatus(complexSituation.typed);
        else setStatus(complexSituation.picked);

        setNewName(name);
        setNewPrice(price);
        setNewQuantity(quantity);
    };

    const sendUpdate = async (): Promise<void> => {
        setStatus(complexSituation.sending);

        const serverResponse = await updateDatabase('updateproduct', {
            id: selectedID,
            name: newName,
            default_price: newPrice,
            quantity_in_stock: newQuantity,
        });
        checkServerResponse(serverResponse);
        setStatus(complexSituation.picked);
    };

    const sendDeletion = async (): Promise<void> => {
        setStatus(complexSituation.sending);

        const serverResponse = await deleteFromDatabase('deleteproduct', { id: selectedID });
        checkServerResponse(serverResponse);

        setStatus(complexSituation.sent);
        emptyInputs();
    };

    const checkServerResponse = (response: databaseResponse): void => {
        response && response.results === 'success'
            ? setStatus(complexSituation.sent)
            : setStatus(complexSituation.error);
    };

    const emptyInputs = (): void => {
        DOM('newName')!.value = '';
        DOM('newPrice')!.value = '';
        DOM('newQuantity')!.value = '';
        DOM('newPrice')!.placeholder = '';
    };

    const disableFields = status < complexSituation.picked;
    const loading: boolean = !!(status === complexSituation.sending);

    if (productList.length > 0) {
        return (
            <div>
                <h1> Editar cadastro de produto </h1>
                <p> {productList.length} produtos cadastrados. </p>

                <div className='editScreen'>
                    <SelectDropdownInput
                        value={selectedID}
                        action={handleProductSelection}
                        list={productList}
                        label='Selecionar produto'
                    />

                    <NameInput id='newName' label='Novo nome' action={checkSubmitReadiness} disabled={disableFields} />

                    <div className='priceQuantityCouple'>
                        <PriceInput
                            id='newPrice'
                            label='Novo preço'
                            action={checkSubmitReadiness}
                            disabled={disableFields}
                        />

                        <QuantityInput
                            id='newQuantity'
                            label='Estoque'
                            action={checkSubmitReadiness}
                            disabled={disableFields}
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

                <GoBack />
            </div>
        );
    } else {
        return (
            <div>
                <h1> Editar cadastro de produto </h1>
                <p> Nenhum produto cadastrado. </p>
            </div>
        );
    }
};

export default EditProduct;
