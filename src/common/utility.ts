export const findMerchantIDUsingStringify = (obj) => {
    const jsonString = JSON.stringify(obj);
    const match = jsonString.match(/"MerchantID":"([^"]+)"/);
    return match ? match[1] : null;
}