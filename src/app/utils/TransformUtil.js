export const transformToArrayObjects = (ops) => {
    let keys = Object.keys(ops);
    let values = Object.values(ops);
    let arrayTransformed = [];
    for (let i = 0; i < keys.length; i++) {
      arrayTransformed.push({ [keys[i]]: values[i] });
    }
  
    return arrayTransformed;
  };

export const transformAddress = address => {
    return `${address.address1} - 
    ${address.number + ", "} 
    ${address.neighborhood ? address.neighborhood + "," : ""} 
    ${address.city ? address.city + "," : ""} 
    ${address.state ? address.state : ""} 
    ${address.address2 ? ' - ' + address.address2 : ""}`
}