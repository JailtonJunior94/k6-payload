import { group, sleep } from 'k6';

import createCustomer from './scenarios/create-customer.js';

export const options = {
    stages: [
        { duration: '1m', target: 15 },
        { duration: '2m', target: 30 },
        { duration: '30s', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(75)<800'], // 75% of requests should be below 800ms
    },
};

export default () => {
    group('[Endpoint] Create Customer', () => {
        createCustomer()
    });
    sleep(1);
}