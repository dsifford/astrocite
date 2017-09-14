## Schema

The full schema specification can be found [here](./types.d.ts).

## Example

### Input

```
TY  - ICOMM
T1  - The Final Nail in Early Goal Directed Therapy’s Coffin?
A1  - Allen-Dicker, Joshua
Y1  - 2015///
JF  - Now @ NEJM
UR  - http://blogs.nejm.org/now/index.php/the-final-nail-in-early-goal-directed-therapys-coffin/2015/03/24/
ER  -
TY  - ICOMM
T1  - The ProMISe Study: EGDT RIP?
A1  - Body, Rick
Y1  - 2015///
Y2  - 2016///
JF  - St. Emlyn's website
UR  - http://stemlynsblog.org/the-promise-study-egdt-rip/; http://blogs.nejm.org/now/index.php/the-final-nail-in-early-goal-directed-therapys-coffin/2015/03/24/
ER  -
TY  - ICOMM
T1  - NephMadness 2015: ProCESS ARISE ProMISe and the promise of Early Goal Directed Therapy
A1  - Boka, Kamran
Y1  - 2015///
JF  - AJKD blog
UR  - http://ajkdblog.org/2015/03/18/nephmadness-2015-process-arise-promise-and-the-promise-of-early-goal-directed-therapy/
ER  -
```

### Output
```json
{
   "kind": "File",
   "loc": {
      "start": {
         "offset": 0,
         "line": 1,
         "column": 1
      },
      "end": {
         "offset": 814,
         "line": 22,
         "column": 6
      }
   },
   "children": [
      {
         "kind": "Entry",
         "loc": {
            "start": {
               "offset": 0,
               "line": 1,
               "column": 1
            },
            "end": {
               "offset": 246,
               "line": 8,
               "column": 1
            }
         },
         "type": "ICOMM",
         "properties": [
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 12,
                     "line": 2,
                     "column": 1
                  },
                  "end": {
                     "offset": 74,
                     "line": 3,
                     "column": 1
                  }
               },
               "key": "T1",
               "value": "The Final Nail in Early Goal Directed Therapy’s Coffin?"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 74,
                     "line": 3,
                     "column": 1
                  },
                  "end": {
                     "offset": 101,
                     "line": 4,
                     "column": 1
                  }
               },
               "key": "A1",
               "value": "Allen-Dicker, Joshua"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 101,
                     "line": 4,
                     "column": 1
                  },
                  "end": {
                     "offset": 115,
                     "line": 5,
                     "column": 1
                  }
               },
               "key": "Y1",
               "value": "2015///"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 115,
                     "line": 5,
                     "column": 1
                  },
                  "end": {
                     "offset": 132,
                     "line": 6,
                     "column": 1
                  }
               },
               "key": "JF",
               "value": "Now @ NEJM"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 132,
                     "line": 6,
                     "column": 1
                  },
                  "end": {
                     "offset": 240,
                     "line": 7,
                     "column": 1
                  }
               },
               "key": "UR",
               "value": "http://blogs.nejm.org/now/index.php/the-final-nail-in-early-goal-directed-therapys-coffin/2015/03/24/"
            }
         ]
      },
      {
         "kind": "Entry",
         "loc": {
            "start": {
               "offset": 246,
               "line": 8,
               "column": 1
            },
            "end": {
               "offset": 531,
               "line": 16,
               "column": 1
            }
         },
         "type": "ICOMM",
         "properties": [
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 258,
                     "line": 9,
                     "column": 1
                  },
                  "end": {
                     "offset": 293,
                     "line": 10,
                     "column": 1
                  }
               },
               "key": "T1",
               "value": "The ProMISe Study: EGDT RIP?"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 293,
                     "line": 10,
                     "column": 1
                  },
                  "end": {
                     "offset": 310,
                     "line": 11,
                     "column": 1
                  }
               },
               "key": "A1",
               "value": "Body, Rick"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 310,
                     "line": 11,
                     "column": 1
                  },
                  "end": {
                     "offset": 324,
                     "line": 12,
                     "column": 1
                  }
               },
               "key": "Y1",
               "value": "2015///"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 324,
                     "line": 12,
                     "column": 1
                  },
                  "end": {
                     "offset": 338,
                     "line": 13,
                     "column": 1
                  }
               },
               "key": "Y2",
               "value": "2016///"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 338,
                     "line": 13,
                     "column": 1
                  },
                  "end": {
                     "offset": 364,
                     "line": 14,
                     "column": 1
                  }
               },
               "key": "JF",
               "value": "St. Emlyn's website"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 364,
                     "line": 14,
                     "column": 1
                  },
                  "end": {
                     "offset": 525,
                     "line": 15,
                     "column": 1
                  }
               },
               "key": "UR",
               "value": "http://stemlynsblog.org/the-promise-study-egdt-rip/; http://blogs.nejm.org/now/index.php/the-final-nail-in-early-goal-directed-therapys-coffin/2015/03/24/"
            }
         ]
      },
      {
         "kind": "Entry",
         "loc": {
            "start": {
               "offset": 531,
               "line": 16,
               "column": 1
            },
            "end": {
               "offset": 814,
               "line": 22,
               "column": 6
            }
         },
         "type": "ICOMM",
         "properties": [
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 543,
                     "line": 17,
                     "column": 1
                  },
                  "end": {
                     "offset": 636,
                     "line": 18,
                     "column": 1
                  }
               },
               "key": "T1",
               "value": "NephMadness 2015: ProCESS ARISE ProMISe and the promise of Early Goal Directed Therapy"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 636,
                     "line": 18,
                     "column": 1
                  },
                  "end": {
                     "offset": 655,
                     "line": 19,
                     "column": 1
                  }
               },
               "key": "A1",
               "value": "Boka, Kamran"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 655,
                     "line": 19,
                     "column": 1
                  },
                  "end": {
                     "offset": 669,
                     "line": 20,
                     "column": 1
                  }
               },
               "key": "Y1",
               "value": "2015///"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 669,
                     "line": 20,
                     "column": 1
                  },
                  "end": {
                     "offset": 685,
                     "line": 21,
                     "column": 1
                  }
               },
               "key": "JF",
               "value": "AJKD blog"
            },
            {
               "type": "Property",
               "loc": {
                  "start": {
                     "offset": 685,
                     "line": 21,
                     "column": 1
                  },
                  "end": {
                     "offset": 809,
                     "line": 22,
                     "column": 1
                  }
               },
               "key": "UR",
               "value": "http://ajkdblog.org/2015/03/18/nephmadness-2015-process-arise-promise-and-the-promise-of-early-goal-directed-therapy/"
            }
         ]
      }
   ]
}
```
