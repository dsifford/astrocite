## Schema

The full schema specification can be found [here](./types.d.ts).

## Example

### Input

```tex
@preamble{ "\newcommand{\noopsort}[1]{} " }

% a sample "regular" entry (ie. not a @comment, @preamble, or @string)

@book{abook,
title = {A } # "Book",                   % an in-entry comment
editor = {  John Q.  Random} # junk,
publisher = {Foo Bar \& Sons},
year = 1922
}

@STRING{ACM = "The OX Association for Computing Machinery"}

@BOOKLET{booklet-full,
   author = "Jill C. Knvth",
   title = "The Programming of Computer Art",
   howpublished = "Vernier Art Center",
   address = "Stanford, California",
   month = feb,
   year = 1988,
   note = "This is a full BOOKLET entry",
}

@comment{ Foo (bar) {baz} }
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
         "offset": 618,
         "line": 24,
         "column": 28
      }
   },
   "children": [
      {
         "kind": "PreambleExpression",
         "loc": {
            "start": {
               "offset": 0,
               "line": 1,
               "column": 1
            },
            "end": {
               "offset": 45,
               "line": 3,
               "column": 1
            }
         },
         "value": [
            {
               "kind": "RegularCommand",
               "loc": {
                  "start": {
                     "offset": 12,
                     "line": 1,
                     "column": 13
                  },
                  "end": {
                     "offset": 39,
                     "line": 1,
                     "column": 40
                  }
               },
               "value": "newcommand",
               "arguments": [
                  {
                     "kind": "RequiredArgument",
                     "loc": {
                        "start": {
                           "offset": 23,
                           "line": 1,
                           "column": 24
                        },
                        "end": {
                           "offset": 34,
                           "line": 1,
                           "column": 35
                        }
                     },
                     "value": [
                        {
                           "kind": "RegularCommand",
                           "loc": {
                              "start": {
                                 "offset": 24,
                                 "line": 1,
                                 "column": 25
                              },
                              "end": {
                                 "offset": 33,
                                 "line": 1,
                                 "column": 34
                              }
                           },
                           "value": "noopsort",
                           "arguments": []
                        }
                     ]
                  },
                  {
                     "kind": "OptionalArgument",
                     "loc": {
                        "start": {
                           "offset": 34,
                           "line": 1,
                           "column": 35
                        },
                        "end": {
                           "offset": 37,
                           "line": 1,
                           "column": 38
                        }
                     },
                     "value": "1"
                  },
                  {
                     "kind": "RequiredArgument",
                     "loc": {
                        "start": {
                           "offset": 37,
                           "line": 1,
                           "column": 38
                        },
                        "end": {
                           "offset": 39,
                           "line": 1,
                           "column": 40
                        }
                     },
                     "value": []
                  }
               ]
            },
            {
               "kind": "Text",
               "loc": {
                  "start": {
                     "offset": 39,
                     "line": 1,
                     "column": 40
                  },
                  "end": {
                     "offset": 40,
                     "line": 1,
                     "column": 41
                  }
               },
               "value": " "
            }
         ]
      },
      {
         "kind": "Entry",
         "id": "abook",
         "type": "book",
         "loc": {
            "start": {
               "offset": 117,
               "line": 5,
               "column": 1
            },
            "end": {
               "offset": 278,
               "line": 12,
               "column": 1
            }
         },
         "properties": [
            {
               "kind": "Property",
               "loc": {
                  "start": {
                     "offset": 131,
                     "line": 6,
                     "column": 1
                  },
                  "end": {
                     "offset": 194,
                     "line": 7,
                     "column": 1
                  }
               },
               "key": "title",
               "value": [
                  {
                     "kind": "Text",
                     "loc": {
                        "start": {
                           "offset": 140,
                           "line": 6,
                           "column": 10
                        },
                        "end": {
                           "offset": 142,
                           "line": 6,
                           "column": 12
                        }
                     },
                     "value": "A "
                  },
                  {
                     "kind": "Text",
                     "loc": {
                        "start": {
                           "offset": 147,
                           "line": 6,
                           "column": 17
                        },
                        "end": {
                           "offset": 151,
                           "line": 6,
                           "column": 21
                        }
                     },
                     "value": "Book"
                  }
               ]
            },
            {
               "kind": "Property",
               "loc": {
                  "start": {
                     "offset": 194,
                     "line": 7,
                     "column": 1
                  },
                  "end": {
                     "offset": 231,
                     "line": 8,
                     "column": 1
                  }
               },
               "key": "editor",
               "value": [
                  {
                     "kind": "Text",
                     "loc": {
                        "start": {
                           "offset": 204,
                           "line": 7,
                           "column": 11
                        },
                        "end": {
                           "offset": 221,
                           "line": 7,
                           "column": 28
                        }
                     },
                     "value": " John Q. Random"
                  },
                  {
                     "kind": "String",
                     "loc": {
                        "start": {
                           "offset": 225,
                           "line": 7,
                           "column": 32
                        },
                        "end": {
                           "offset": 229,
                           "line": 7,
                           "column": 36
                        }
                     },
                     "value": "junk"
                  }
               ]
            },
            {
               "kind": "Property",
               "loc": {
                  "start": {
                     "offset": 231,
                     "line": 8,
                     "column": 1
                  },
                  "end": {
                     "offset": 263,
                     "line": 9,
                     "column": 1
                  }
               },
               "key": "publisher",
               "value": [
                  {
                     "kind": "Text",
                     "loc": {
                        "start": {
                           "offset": 244,
                           "line": 8,
                           "column": 14
                        },
                        "end": {
                           "offset": 252,
                           "line": 8,
                           "column": 22
                        }
                     },
                     "value": "Foo Bar "
                  },
                  {
                     "kind": "SymbolCommand",
                     "loc": {
                        "start": {
                           "offset": 252,
                           "line": 8,
                           "column": 22
                        },
                        "end": {
                           "offset": 254,
                           "line": 8,
                           "column": 24
                        }
                     },
                     "value": "&"
                  },
                  {
                     "kind": "Text",
                     "loc": {
                        "start": {
                           "offset": 254,
                           "line": 8,
                           "column": 24
                        },
                        "end": {
                           "offset": 259,
                           "line": 8,
                           "column": 29
                        }
                     },
                     "value": " Sons"
                  }
               ]
            },
            {
               "kind": "Property",
               "loc": {
                  "start": {
                     "offset": 263,
                     "line": 9,
                     "column": 1
                  },
                  "end": {
                     "offset": 275,
                     "line": 10,
                     "column": 1
                  }
               },
               "key": "year",
               "value": {
                  "kind": "Number",
                  "loc": {
                     "start": {
                        "offset": 270,
                        "line": 9,
                        "column": 8
                     },
                     "end": {
                        "offset": 274,
                        "line": 9,
                        "column": 12
                     }
                  },
                  "value": 1922
               }
            }
         ]
      },
      {
         "kind": "StringExpression",
         "loc": {
            "start": {
               "offset": 278,
               "line": 12,
               "column": 1
            },
            "end": {
               "offset": 339,
               "line": 14,
               "column": 1
            }
         },
         "key": "ACM",
         "value": [
            {
               "kind": "Text",
               "loc": {
                  "start": {
                     "offset": 293,
                     "line": 12,
                     "column": 16
                  },
                  "end": {
                     "offset": 335,
                     "line": 12,
                     "column": 58
                  }
               },
               "value": "The OX Association for Computing Machinery"
            }
         ]
      },
      {
         "kind": "Entry",
         "id": "booklet-full",
         "type": "booklet",
         "loc": {
            "start": {
               "offset": 339,
               "line": 14,
               "column": 1
            },
            "end": {
               "offset": 591,
               "line": 24,
               "column": 1
            }
         },
         "properties": [
            {
               "kind": "Property",
               "loc": {
                  "start": {
                     "offset": 362,
                     "line": 15,
                     "column": 1
                  },
                  "end": {
                     "offset": 391,
                     "line": 16,
                     "column": 1
                  }
               },
               "key": "author",
               "value": [
                  {
                     "kind": "Text",
                     "loc": {
                        "start": {
                           "offset": 375,
                           "line": 15,
                           "column": 14
                        },
                        "end": {
                           "offset": 388,
                           "line": 15,
                           "column": 27
                        }
                     },
                     "value": "Jill C. Knvth"
                  }
               ]
            },
            {
               "kind": "Property",
               "loc": {
                  "start": {
                     "offset": 391,
                     "line": 16,
                     "column": 1
                  },
                  "end": {
                     "offset": 437,
                     "line": 17,
                     "column": 1
                  }
               },
               "key": "title",
               "value": [
                  {
                     "kind": "Text",
                     "loc": {
                        "start": {
                           "offset": 403,
                           "line": 16,
                           "column": 13
                        },
                        "end": {
                           "offset": 434,
                           "line": 16,
                           "column": 44
                        }
                     },
                     "value": "The Programming of Computer Art"
                  }
               ]
            },
            {
               "kind": "Property",
               "loc": {
                  "start": {
                     "offset": 437,
                     "line": 17,
                     "column": 1
                  },
                  "end": {
                     "offset": 477,
                     "line": 18,
                     "column": 1
                  }
               },
               "key": "howpublished",
               "value": [
                  {
                     "kind": "Text",
                     "loc": {
                        "start": {
                           "offset": 456,
                           "line": 17,
                           "column": 20
                        },
                        "end": {
                           "offset": 474,
                           "line": 17,
                           "column": 38
                        }
                     },
                     "value": "Vernier Art Center"
                  }
               ]
            },
            {
               "kind": "Property",
               "loc": {
                  "start": {
                     "offset": 477,
                     "line": 18,
                     "column": 1
                  },
                  "end": {
                     "offset": 514,
                     "line": 19,
                     "column": 1
                  }
               },
               "key": "address",
               "value": [
                  {
                     "kind": "Text",
                     "loc": {
                        "start": {
                           "offset": 491,
                           "line": 18,
                           "column": 15
                        },
                        "end": {
                           "offset": 511,
                           "line": 18,
                           "column": 35
                        }
                     },
                     "value": "Stanford, California"
                  }
               ]
            },
            {
               "kind": "Property",
               "loc": {
                  "start": {
                     "offset": 514,
                     "line": 19,
                     "column": 1
                  },
                  "end": {
                     "offset": 530,
                     "line": 20,
                     "column": 1
                  }
               },
               "key": "month",
               "value": [
                  {
                     "kind": "String",
                     "loc": {
                        "start": {
                           "offset": 525,
                           "line": 19,
                           "column": 12
                        },
                        "end": {
                           "offset": 528,
                           "line": 19,
                           "column": 15
                        }
                     },
                     "value": "feb"
                  }
               ]
            },
            {
               "kind": "Property",
               "loc": {
                  "start": {
                     "offset": 530,
                     "line": 20,
                     "column": 1
                  },
                  "end": {
                     "offset": 546,
                     "line": 21,
                     "column": 1
                  }
               },
               "key": "year",
               "value": {
                  "kind": "Number",
                  "loc": {
                     "start": {
                        "offset": 540,
                        "line": 20,
                        "column": 11
                     },
                     "end": {
                        "offset": 544,
                        "line": 20,
                        "column": 15
                     }
                  },
                  "value": 1988
               }
            },
            {
               "kind": "Property",
               "loc": {
                  "start": {
                     "offset": 546,
                     "line": 21,
                     "column": 1
                  },
                  "end": {
                     "offset": 588,
                     "line": 22,
                     "column": 1
                  }
               },
               "key": "note",
               "value": [
                  {
                     "kind": "Text",
                     "loc": {
                        "start": {
                           "offset": 557,
                           "line": 21,
                           "column": 12
                        },
                        "end": {
                           "offset": 585,
                           "line": 21,
                           "column": 40
                        }
                     },
                     "value": "This is a full BOOKLET entry"
                  }
               ]
            }
         ]
      }
   ]
}
```
