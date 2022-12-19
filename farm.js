//** getYieldForPlant **//
const getYieldForPlant = (input, environmentFactors) => {
  let result = 0;

  // determine if environmentfactors apply //
  if (typeof environmentFactors !== "undefined") {
    let sun = "sun" in input.factor;
    let rain = "rain" in input.factor;

    // calculation function per environmentfactor //
    const calculationAdjustFactorSun = () => {
      calculationSun = (input.factor.sun[environmentFactors.sun] + 100) / 100;
      return calculationSun;
    };
    const calculationAdjustFactorRain = () => {
      calculationRain =
        (input.factor.rain[environmentFactors.rain] + 100) / 100;
      return calculationRain;
    };

    // calculation yield per crop with applying the environmentfactor //
    if (sun && rain) {
      result +=
        input.yield *
        calculationAdjustFactorSun() *
        calculationAdjustFactorRain();
      return result;
    } else if (sun) {
      result += input.yield * calculationAdjustFactorSun();
      return result;
    } else if (rain) {
      result += input.yield * calculationAdjustFactorRain();
      return result;
    } else {
      return input.yield;
    }
  } else {
    // if none environmentfactor not exist, return the default yield per crop //
    return input.yield;
  }
};

//** getYieldForCrop **//
const getYieldForCrop = (input, environmentFactors) => {
  yieldplant = getYieldForPlant(input.crop, environmentFactors);
  const yieldCrop = yieldplant * input.numCrops;
  return yieldCrop;
};

//** getTotalYield **//
const getTotalYield = (input, environmentFactors) => {
  const crops = input.crops;
  const cropsYield = crops.map((input) =>
    getYieldForCrop(input, environmentFactors)
  );
  return cropsYield.reduce(
    (subtotalYield, cropYield) => subtotalYield + cropYield
  );
};

//** getCostsForCrop **//
const getCostsForCrop = (input) => {
  const cropCost = input.crop.cost * input.crop.yield * input.numCrops;
  return cropCost;
};

//** getRevenueForCrop **//
const getRevenueForCrop = (input, environmentFactors) => {
  const revenueCrop =
    getYieldForCrop(input, environmentFactors) * input.crop.price;
  return revenueCrop;
};

//** getProfitForCrop **//
const getProfitForCrop = (input, environmentFactors) => {
  const cropProfit =
    getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input);
  return cropProfit;
};

//** getTotalProfit **//
const getTotalProfit = (input, environmentFactors) => {
  const crops = input.crops;
  const totalprofit = crops.map((input) =>
    getProfitForCrop(input, environmentFactors)
  );
  return totalprofit.reduce(
    (subtotalprofit, totalprofit) => subtotalprofit + totalprofit
  );
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
