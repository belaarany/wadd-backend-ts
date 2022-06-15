# WADD backend

WADD (Finance Tracker) application backend.

## 🚀 Tech stack
- NodeJS
- NestJS
- GraphQL
- RabbitMQ Microservices

## 🎯 Motivation
I wanted to create an full-stack application for finance tracking. The first idea was to create microservices (RabbitMQ) for the modules, but it was overwhelming for me to maintain, so I merged the microservices into this monolith application. I wanted to practise the concept of NestJS. I also wanted to work with GraphQL because this architecture really fits into this full-stack finance tracker application.

## 💡 Features
- Store Wallets, Incomes, Expenses, Transfers, Categories
- Calculate Wallet and Category balances
- Serve the data using GraphQL
- Using Dataloader for GraphQL to optimize the performance and reduce unnecessary database queries
- ~Communicating with microservices using RabbitMQ~
