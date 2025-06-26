import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Create a timestamp-based filename
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').split('Z')[0];
const fileName = `results/result-${timestamp}.html`;

export function handleSummary(data) {
  return {
    [fileName]: htmlReport(data, { title: "K6 Load Test Summary" }),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}