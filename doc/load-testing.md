
# Description

Load testing is a type of testing that is used to determine the performance of a system under a certain load. It is important to ensure that the system can handle the expected user load and traffic and is a good service to have in order to ensure the system is ready for production.

For load testing we chose to use **[K6](https://github.com/grafana/k6)**. 

## Why K6

K6 is a modern and widely used load testing tool that is easily pluggable with the Grafana interface already used, making it simple to setup and use. It is highly scalable and is designed to simulate real-world user traffic. Its intuitive syntax allows for easy scripting and debugging, allowing for more accurate testing. It also supports a wide range of APIs and supports testing of multiple servers simultaneously. In addition, it features built-in analytics, making it easy to monitor performance. Furthermore, k6 is open source and is completely free to use. All of these features make k6 an ideal choice for load testing. 

We could use other tools like [wrk](https://github.com/wg/wrk) and [locust](https://github.com/locustio/locust) wich are also widely used, but for because we already have a Grafana interface for motinoring, we prefered to go for simplicity. K6 is scriptable using Javascript which is also one of our language of confort.

