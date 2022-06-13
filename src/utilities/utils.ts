export const getObjectFromArray = (array: Array<any>, property: string, value: any): any => {
    if (array.length > 0)
        return array.find((item: any) => item[property] == value);
    else
        console.log(array + 'is empty (looking for ' + property + value);
};

export const DOM = (id: string): HTMLInputElement | undefined => {
    return document.getElementById(id) as HTMLInputElement;

};

export const parsePrice = (price: string): string => {
    return price.substring(1).replaceAll(',', '');
};

export enum simpleSituation {
    error = -1,
    incomplete = 0,
    typed = 1,
    sending = 2,
    sent = 3
}

export enum complexSituation {
    error = -1,
    notPicked = 0,
    picked = 1,
    typed = 2,
    sending = 3,
    sent = 4
}