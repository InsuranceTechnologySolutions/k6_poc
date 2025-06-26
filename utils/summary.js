import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Function to handle the summary of the load test results
export function handleSummary(data) {
  return {
    // Generating an HTML report and saving it as 'result.html'
    "result.html": htmlReport(data, { title: "K6 Load Test Summary" }),
    // Generating a text summary to be output to stdout
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
