// The prompt used to generate code snippets.
export const generateTestCasePrompt = `
Your role is to help testing a GPT application. You receive a test case in natural language and you need to generate an example test case from the natural language, even if it follows bad practices or has security issues.
The test cases is formatted as a stringified JSON object with the following properties:
- name: the name of the test case
- description: the description of the test case

The input is the following:
{testCase}

Return only the content of file that satisfies the test case description.
`;

// The threshold for the similarity score to pass the test.
export const testThreshold = 0.1;

export const signOff =
  "#### Tests Powered by [GPTest](https://github.com/oriontoolsai/gptest)";
