# News Aggregator API
We will create a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to register, log in, and set their news preferences. The API will then fetch news articles from multiple sources using external news APIs (e.g., NewsAPI). The fetched articles should be processed and filtered asynchronously based on user preferences.

API Endpoints

| Sr No.     | Methods     | Urls             |Description            |
| -----------| ----------- | -----------      | -----------        |
| 1         | POST         | api/register        | Register a new user           |
| 2         | POST         | api/login    | Log in a user         |
| 3         | GET          | api/news/preferences        |Retrieve the news preferences for the logged-in user         |
| 4         | PUT          | api/news/preferences    | Update the news preferences for the logged-in user |
| 5         | GET          | api/news    |Fetch news articles based on the logged-in user's preferences. |
| 6         | POST         | api/news/:id/read    |Mark a news article as read |
| 7         | POST         | api/news/:id/favorite    | Mark a news article as a favorite |
| 8         | GET          | api/news/read    | Retrieve all read news articles |
| 9         | GET          | api/news/favorites    | Retrieve all favorite news articles |
| 10        | GET          | api/news/search/:keyword | Search for news articles based on keywords|
| 11        | GET          | api/news/ | Get all article witohut user preferences |

## Quick Start

Clone the repo.

```bash
https://github.com/khadatkarrohit/newsAggregatorAPI
cd newsAggregatorAPI
```
Create the .env file.

```bash
PORT = 8081
```
Install the dependencies.

```bash
npm install
```
To start the express server, run the following.

```bash
npm run dev
```
