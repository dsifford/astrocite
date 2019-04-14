# astrocite-googlebooks

A helper library for converting Google Books API JSON to CSL JSON.

See [astrocite](https://github.com/dsifford/astrocite) for more details.

## API

### toCSL(apiResponse, isChapter = false)

Returns: `Array<CSL.Data>`

#### apiResponse

Type: `Object`

The entire JSON response received from the Google Books volumes API.

#### isChapter

Type: `boolean`

Use this to set title to the appropriate field when you intend to use the data for citing an individual chapter.

## Usage

```js
import { toCSL } from 'astrocite-googlebooks';

// Assume apiResponse is the JSON received from the Google Books volume API
const cslJSON = toCSL(apiResponse);

// Citing a chapter
const chapterCslJSON = toCSL(apiResponse, true);
```
