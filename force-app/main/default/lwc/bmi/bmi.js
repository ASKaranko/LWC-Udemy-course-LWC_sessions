const getBMI = (bmiData) => {
    try {
        return bmiData.weight /(bmiData.height * bmiData.height);   
    } catch(e) {
        return undefined;
    }
};

export {getBMI}; 