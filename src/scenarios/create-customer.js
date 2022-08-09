import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import * as faker from 'faker-br';

export const generateCustomer = () => ({
    document: faker.br.cpf(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
});

export default function () {
    const customer = generateCustomer();
    const url = 'http://localhost:9000/customers';
    const payload = JSON.stringify(customer);
    const response = http.post(url, payload);

    check(response, { 'status was 200': (r) => r.status === 200 });
    sleep(1);
}