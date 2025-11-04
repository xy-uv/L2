//* Grouping and Aggregating Data

// Scenario: Count every survey and group by response

//? input
const surveyResponses = [
  "A",
  "C",
  "B",
  "A",
  "B",
  "B",
  "C",
  "A",
  "B",
  "D",
  "A",
  "C",
  "B",
  "A",
];

//? Output

//TODO initiate empty object
//TODO Check if the response already exist or not
//TODO If it exists then increment the count
//TODO If not then initialize it with 1

// { A: 5, C: 3, B: 5, D: 1 }
const survey = surveyResponses.reduce((acc, ans) => {
  //   if (acc[ans]) {
  //     acc[ans] += 1;
  //   } else {
  //     acc[ans] = 1;
  //   }
  acc[ans] = (acc[ans] || 0) + 1;
  return acc;
}, {});

console.log(survey);
