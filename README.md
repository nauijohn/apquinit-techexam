Technical Exam
Submitted by Anthony Naui
=========================

## Backend

> Made with NestJS

Endpoints

Balances

1. Create Balance

```
method: POST
url: /balances/:walletAddress
requestBody: {
	balance: number
}
```

2. Find Balance

```
method: GET
url: /balances/:walletAddress
```

3. Update Balance

```
method: PUT
url: /balances/:walletAddress
requestBody: {
	balance: number
}
```

4. Delete Balance

```
method: DELETE
url: /balances/:walletAddress
```

## Frontend

> Made with React + Vite + Tailwindcss

## Contracts

> Created simple contract  
> I really have no idea about blockchain

## Execution

> Run command below from root

```
docker compose up
```
