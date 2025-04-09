# Honest Fetch

Honest Fetch is a lightweight and reliable HTTP client for making API requests in JavaScript. It simplifies the process of fetching data while maintaining transparency and flexibility.

## Features

- Simple and intuitive API.
- Supports GET, POST, PUT, DELETE, and other HTTP methods.
- Automatic JSON parsing for responses.
- Customizable headers and request options.
- Error handling made easy.

## Installation

Install via npm:

```bash
npm install honest-fetch
```

Or via yarn:

```bash
yarn add honest-fetch
```

## Usage

Here's a quick example of how to use Honest Fetch:

```javascript
import {safeFetch} from 'honest-fetch';

async function fetchData() {
    const {data, error, exception} = await safeFetch('https://api.example.com/data');
    if(error || exception){
        // Handle errors...
        return
    }
    // Handle data....
}

fetchData();
```

## API

### `safeFetch(url, options)`

- `url` (string): The URL to fetch.
- `options` (object): Optional configuration for the request.

### Example with options:

```javascript
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key: 'value' }),
};

safeFetch('https://api.example.com/data', options)
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).