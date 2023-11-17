---
  day: 1
  time: "11:20"
  tags:
    - Web
  name: "Measuring the Cost of a GraphQL Query"
  duration: 50 min
  type: talk
  room: Charms Classroom
  language: English
  speakers:
    - m-ippolito

---
Developers often make the mistake of centralizing fragment definitions and using them in every query, even when only a subset of attributes is needed. It's important for GraphQL clients to be mindful of query optimization because the server has to process the client's query and generate a customized response. If the client's query isn't optimized, it can force the server to process unnecessary data, resulting in slower response times. Unfortunately, identifying performance bottlenecks and slow queries, especially in an Apollo Federation architecture, can be quite challenging. In this session, we'll dive into the reasons why measuring the "cost" of a GraphQL query is not a simple task. We'll explore how the unique design of GraphQL affects the speed at which it executes a query. You'll understand why it's essential for you, as a client, to prioritize query optimization in order to achieve faster and more efficient performance.
  