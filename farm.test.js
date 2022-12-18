//** IMPORT FUNCTIONS **/
const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

//** TEST YIELD PER PLAN - WITH ENVIRONMENTAL FACTORS **/

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 10,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const environmentFactors = {
    sun: "low",
  };

  //** getYieldForPlant without environmental factors **//
  // test("Get yield for plant with no environment factors", () => {
  //   expect(getYieldForPlant(corn)).toBe(30);
  // });

  test("Get yield for plant with environment factors", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBe(5);
  });
});

//** TEST YIELD PER CROP - WITH ENVIRONMENTAL FACTORS **/

describe("getYieldForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const input = {
    crop: corn,
    numCrops: 10,
  };

  const environmentFactors = {
    sun: "low",
  };

  //** getYieldForCrop without environmental factors **//
  // test("Get yield for crop, simple", () => {
  //   expect(getYieldForCrop(input)).toBe(30);
  // });

  test("Get yield for crop, with environment factors", () => {
    expect(getYieldForCrop(input, environmentFactors)).toBe(15);
  });
});

//** TESTS TOTAL YIELD - WITH ENVIRONMENTAL FACTORS **/

describe("getTotalYield", () => {
  const corn = {
    name: "corn",
    yield: 3,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      rain: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const crops = [
    { crop: corn, numCrops: 5 },
    { crop: pumpkin, numCrops: 2 },
  ];

  const environmentFactors = {
    sun: "low",
    rain: "high",
  };

  //** getTotalYield without environmental factors **//
  // test("Calculate total yield with multiple crops", () => {
  //   expect(getTotalYield({ crops })).toBe(23);
  // });

  test("Calculate total yield with multiple crops and with environment factors", () => {
    expect(getTotalYield({ crops }, environmentFactors)).toBe(13.5);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const crops = [{ crop: corn, numCrops: 0 }];

    //** getTotalYield ith 0 amount and without environmental factors **//
    // expect(getTotalYield({ crops })).toBe(0);

    expect(getTotalYield({ crops }, environmentFactors)).toBe(0);
  });
});

//** TEST COST PER CROP **/

describe("getCostsForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    cost: 1,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const input = {
    crop: corn,
    numCrops: 5,
  };

  test("Get costs for crop", () => {
    expect(getCostsForCrop(input)).toBe(15);
  });
});

//** TEST REVENUE PER CROP - WITH ENVIRONMENTAL FACTORS **/

describe("getRevenueForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    cost: 1,
    price: 2,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const input = {
    crop: corn,
    numCrops: 5,
  };

  const environmentFactors = {
    sun: "low",
    rain: "high",
  };

  test("Get revenue for crop", () => {
    expect(getRevenueForCrop(input, environmentFactors)).toBe(15);
  });
});

//** TEST PROFIT PER CROP - WITH ENVIRONMENTAL FACTORS **/

describe("getProfitForCrop", () => {
  const corn = {
    name: "corn",
    yield: 10,
    cost: 2,
    price: 6,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const input = {
    crop: corn,
    numCrops: 5,
  };

  const environmentFactors = {
    sun: "low",
    rain: "high",
  };

  test("Get profit for crop", () => {
    expect(getProfitForCrop(input, environmentFactors)).toBe(50);
  });
});

//** TEST TOTAL PROFIT FARM - WITH ENVIRONMENTAL FACTORS **/

describe("getTotalProfit,", () => {
  const corn = {
    name: "corn",
    yield: 10,
    cost: 2,
    price: 4,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    cost: 2,
    price: 4,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      rain: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const avocado = {
    name: "avocado",
    yield: 6,
    cost: 2,
    price: 8,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      rain: {
        low: 0,
        medium: 0,
        high: 50,
      },
    },
  };

  const potato = {
    name: "potato",
    yield: 10,
    cost: 2,
    price: 4,
    factor: {
      rain: {
        low: -40,
        medium: 0,
        high: 20,
      },
    },
  };

  const crops = [
    { crop: corn, numCrops: 5 },
    { crop: pumpkin, numCrops: 2 },
    { crop: avocado, numCrops: 10 },
    { crop: potato, numCrops: 6 },
  ];

  const environmentFactors = {
    sun: "low",
    rain: "high",
  };

  test("Get total profit from the farm", () => {
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(416);
  });
});
