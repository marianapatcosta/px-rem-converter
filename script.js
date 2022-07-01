const title = document.getElementById('title');

const exchangeButton = document.getElementById('exchange-button');
const copyButton = document.getElementById('copy-button');

const insertInput = document.getElementById('insert-input');
const convertedInput = document.getElementById('converted-input');

const UNITS = {
    PX: 'px',
    REM: 'rem'
};

const CONVERSION_FACTOR = 16;

let fromUnit = UNITS.PX;

const updateTexts = () => {
    insertInput.placeholder = fromUnit;
    convertedInput.placeholder =  fromUnit === UNITS.PX ? UNITS.REM : UNITS.PX;
};

updateTexts();

const exchangeFromUnit = () => {
    fromUnit = fromUnit === UNITS.PX ? UNITS.REM : UNITS.PX;
    updateTexts();
    const insertValue = insertInput.value;
    insertInput.value = convertedInput.value || '';
    convertedInput.value = insertValue || '';
};

const copyToConvertedValueClipboard = async () => {
    try {
        if (typeof navigator === 'undefined' || !navigator.clipboard) {
            throw new Error('this functionality is not available in this browser.');
        }
        navigator.clipboard.writeText(convertedInput.value);
    } catch (error) {
        console.error('An error occured:', error);
    }
};

const pxToRem = (value) => !value ? '' : value / CONVERSION_FACTOR;

const remToPx = (value) => !value ? '' : value * CONVERSION_FACTOR;

const convertValue = () => {
    const value = Number(insertInput.value);
    const convertedValue = fromUnit === UNITS.PX ? pxToRem(value) : remToPx(value);
    convertedInput.value = convertedValue;
};

exchangeButton.addEventListener('click', exchangeFromUnit);
copyButton.addEventListener('click', copyToConvertedValueClipboard);
insertInput.addEventListener('input', convertValue);
