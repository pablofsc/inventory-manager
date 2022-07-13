import { useState, useEffect, ReactElement } from 'react';

import { Paper, SelectChangeEvent } from '@mui/material';

import { DOM, getObjectFromArray, parsePrice, simpleSituation } from '../../utilities/utils';
import { customerObject, databaseResponse, productObject } from '../../utilities/interfaces';
import { addToDatabase, getFromDatabase } from '../../utilities/database';

import ButtonInput from '../inputs/ButtonInput';
import PriceInput from '../inputs/PriceInput';
import QuantityInput from '../inputs/QuantityInput';
import SelectDropdownInput from '../inputs/SelectDropdownInput';

interface Properties {
    customer?: customerObject;
    product?: productObject;
}

const NewSale = (props: Properties): ReactElement => {
    const [status, setStatus] = useState<simpleSituation>(simpleSituation.incomplete);

    const [customerList, setCustomerList] = useState<Array<customerObject>>([]);
    const [productList, setProductList] = useState<Array<productObject>>([]);

    const [selectedCustomerID, setCustomerID] = useState<string>(props.customer?.id || '');
    const [selectedProductID, setProductID] = useState<string>(props.product?.id || '');
    const [pricePerUnit, setPrice] = useState<string>('');
    const [quantitySold, setQuantity] = useState<string>('');

    useEffect(() => {
        getFromDatabase('customers').then((result: Array<customerObject>) => setCustomerList(result));
        getFromDatabase('inventory').then((result: Array<productObject>) => setProductList(result));

        props.product ? DOM('price')!.value = parsePrice(props.product.default_price) : '';
        DOM('quantity')!.value = '1';
    }, [status]);

    const handleCustomerSelection = (event: SelectChangeEvent): void => {
        setStatus(simpleSituation.incomplete);

        const id = event.target.value;
        setCustomerID(id);

        checkSubmitReadiness(id, selectedProductID, pricePerUnit, quantitySold);
    };

    const handleProductSelection = (event: SelectChangeEvent): void => {
        setStatus(simpleSituation.incomplete);

        const id = event.target.value;
        setProductID(id);

        const default_price = parsePrice(getObjectFromArray(productList, 'id', id).default_price);
        DOM('price')!.value = default_price;
        DOM('price')!.placeholder = default_price;
        setPrice(default_price);

        const quantity = '1';
        DOM('quantity')!.value = quantity;
        setQuantity(quantity);

        checkSubmitReadiness(selectedCustomerID, id, default_price, '1');
    };

    const handleTextInput = (): void => {
        const price = DOM('price')!.value;
        setPrice(price);
        const quantity = DOM('quantity')!.value;
        setQuantity(quantity);

        checkSubmitReadiness(selectedCustomerID, selectedProductID, price, quantity);
    };

    const checkSubmitReadiness = (customer: string, product: string, price: string, quantity: string): void => {
        customer && product && price && quantity
            ? setStatus(simpleSituation.typed)
            : setStatus(simpleSituation.incomplete);
    };

    const sendform = async (): Promise<void> => {
        setStatus(simpleSituation.sending);

        const serverResponse = await addToDatabase('newsale', {
            id: -1,
            product_id: selectedProductID,
            customer_id: selectedCustomerID,
            quantity: quantitySold,
            price: pricePerUnit
        });

        checkServerResponse(serverResponse);
    };

    const checkServerResponse = (response: databaseResponse): void => {
        response && response.results === 'success' ? setStatus(simpleSituation.sent) : setStatus(simpleSituation.error);
    };

    return (
        <div>
            <div className='editScreen'>
                {props.customer ?
                    <Paper variant='outlined' style={{ paddingLeft: '20px', textAlign: 'left' }}>
                        <p>Vendendo para {props.customer.name}</p>
                        <p>Cliente desde {props.customer.parsedDate}</p>
                    </Paper>
                    :
                    <SelectDropdownInput
                        value={selectedCustomerID}
                        action={handleCustomerSelection}
                        list={customerList}
                        label='Selecionar cliente'
                    />
                }

                {props.product ?
                    <Paper variant='outlined' style={{ paddingLeft: '20px', textAlign: 'left' }}>
                        <p>Vendendo {props.product.name}</p>
                        <p>{props.product.quantity_in_stock} unidades em estoque</p>
                    </Paper>
                    :
                    <SelectDropdownInput
                        value={selectedProductID}
                        action={handleProductSelection}
                        list={productList}
                        label='Selecionar produto'
                    />
                }

                <div className='priceQuantityCouple'>
                    <PriceInput id='price' label='Preço unitário' action={handleTextInput} />

                    <QuantityInput id='quantity' label='Quantidade' action={handleTextInput} shrink={false} />
                </div>

                <ButtonInput
                    action={sendform}
                    loading={status === simpleSituation.sending}
                    disabled={status < simpleSituation.typed}
                    text='REGISTRAR VENDA'
                />
            </div>

            <p> {status === simpleSituation.sent ? 'Venda realizada.' : <></>} </p>
        </div>
    );
};

export default NewSale;
