# astrocite-eutils

An helper library for converting PubMed EUtils ESummary JSON to CSL JSON.

See [astrocite](https://github.com/dsifford/astrocite) for more details.

## API

### toCSL(apiResponse)

#### apiResponse

Type: `Object`

The entire JSON response received from the PubMed EUtils ESummary API

## Usage

```js
import { toCSL } from 'astrocite-eutils';

// Assume apiResponse is the JSON received from the EUtils ESummary API
const cslJSON = toCSL(apiResponse);
```

