import http from "k6/http";
import { check, sleep, group } from "k6";

const API_URL = __ENV.API_URL;

const stress_test = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

const soak_test = {
  stages: [
    { duration: '2m', target: 400 }, // ramp up to 400 users
    { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
    { duration: '2m', target: 0 }, // scale down. (optional)
  ],
};

const load_test = {
  stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
}

const smoke_test = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',
};

const tests = {
  smoke_test,
  load_test,
  soak_test,
  stress_test,
}
//   smoke_test, load_test, soak_test, stress_test
export const options = tests[__ENV.TEST_NAME || 'stress_test']

const USERNAME = 'Superuser@test.com';
const PASSWORD = 'Supertestingpassword';
let token = '';

export function setup() {
  // register a user
  const register = http.post(`${API_URL}/auth/register`, {
    email: USERNAME,
    password: PASSWORD,
    firstname: "test",
    lastname: "test",
    age: 20,
  });

  // get the token
  const login = http.post(`${API_URL}/auth/login`, {
    username: USERNAME,
    password: PASSWORD,
  });
  json = JSON.parse(login.body);
  if (json.access_token) {
    token = json.access_token;
  }
}

export default function (data) {
  group("/", function () {
    const res = http.get(API_URL + "/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    check(res, {
      "status is 200": (r) => r.status === 200,
    });
    sleep(.5);
  });

  group("/users", function () {
    const res = http.get(API_URL + "/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    check(res, {
      "status is 200": (r) => r.status === 200,
    });
    sleep(.5);
  })

  group("/associations", function () {
    const res = http.get(API_URL + "/associations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    check(res, {
      "status is 200": (r) => r.status === 200,
    });
    sleep(.5);
  })

  group("/profile", function () {
    const res = http.get(API_URL + "/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    check(res, {
      "status is 200": (r) => r.status === 200,
    });
    sleep(.5);
  })

  group("/pagenotfound", function () {
    const res = http.get(API_URL + "/pagenotfound", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    check(res, {
      "status is 200": (r) => r.status === 200,
    });
    sleep(.5);
  })

  group("/roles", function () {
    const res = http.get(API_URL + "/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    check(res, {
      "status is 200": (r) => r.status === 200,
    });
    sleep(.5);
  })

  group("/minutes", function () {
    const res = http.get(API_URL + "/minutes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    check(res, {
      "status is 200": (r) => r.status === 200,
    });
    sleep(.5);
  })
}