/** Build a frequency counter object from an array */

function freqCounts(arr) {
  return arr.reduce(function (acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}


/** Find the most frequent num in nums (first of tie wins) */

function findMode(nums) {
  const freqCounter = freqCounts(nums);
  let count = 0;
  let mostFrequent;

  for (let num in freqCounter) {
    if (freqCounter[num] > count) {
      mostFrequent = num;
      count = freqCounter[num];
    }
  }

  return +mostFrequent;
}


/** Returns mean number in array of numbers. */

function findMean(nums) {
  if (nums.length === 0) return 0;
  return nums.reduce(function (acc, cur) {
    return acc + cur;
  }) / nums.length
}


/** Returns median number in array of numbers. */

function findMedian(nums) {
  // sort and get the middle element

  nums.sort((a, b) => a - b);

  let middleIndex = Math.floor(nums.length / 2);
  let median;

  if (nums.length % 2 === 0) {
    median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
  } else {
    median = nums[middleIndex];
  }
  return median
}


module.exports = {
  findMean,
  findMedian,
  findMode,
};
