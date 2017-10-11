# astrocite-eutils

An helper library for converting PubMed EUtils ESummary JSON to CSL JSON.

See [astrocite](https://github.com/dsifford/astrocite) for more details.

## API

### toCSL(apiResponse)

Returns: `Array<CSL.Data | EUtilsError>`

Where `EUtilsError` has the following interface

```ts
interface EUtilsError extends Error {
    /**
     * If the error occured on a single reference, then this is set with the identifier of that
     * reference
     */
    uid?: string;
    /**
     * True if the error is a global API-level error. Otherwise the Error occured on a single
     * reference (i.e, some of the request produced a valid result.)
     **/
    apiError: boolean;
}
```

#### apiResponse

Type: `Object`

The entire JSON response received from the PubMed EUtils ESummary API

## Usage

```js
import { toCSL } from 'astrocite-eutils';

// Assume apiResponse is the JSON received from the EUtils ESummary API
const cslJSON = toCSL(apiResponse);
```
