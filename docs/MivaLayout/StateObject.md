# [Classes](/) → [MivaLayout](/MivaLayout) : State Object

---

## Overview

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex ullam repellendus doloremque, explicabo velit esse dignissimos, id, magnam nihil eligendi omnis ipsam sed ipsa quibusdam itaque aliquam enim commodi impedit.

## Structure

### Component Data Object

This object type will be the value of the `componentId` keys within the State Object.

#### The `:::js __attributes__` Key

Every component data object must contain a key `:::js __attributes__` that contains a hash of the `component.attributes` object. Hashing can be done using the [object-hash](https://www.npmjs.com/package/object-hash) NPM package.

## Example

```
// State Object - example
{
    
    // Component Data Object - example
        "101": {
            "__attributes__": "2d83da37c10c3ff108e99cabc1a7c5f46716f859",
            "openChildId": null
        },

    "102": {
        "__attributes__": "a747a6d0d7a79c97798bffde2d7613892d9e2c54",
        "savedProductCode": null
    },
    "103": {
        "__attributes__": "0aaba145f5134027b0fb9855cd96bc4b2611abbc",
        "savedProductCode": null
    },
    "104": {
        "__attributes__": "76c21af95c62bd1bfbf36e69771fcaec936c63b3",
        "savedProductCode": null
    },
    "105": {
        "__attributes__": "4e994448f135a5eaee787164853348ed7a3a5d78"
        "openChildId": 106
    },
    "106": {
        "__attributes__": "ec259de0da64760de58a2c5d705a1707b25b0672",
        "savedProductCode": "abc123"
    },
    "107": {
        "__attributes__": "704101730b956fa47e7b679c4f7c37cfb13a2120",
        "savedProductCode": null
    },
    "108": {
        "__attributes__": "0aaba145f5134027b0fb9855cd96bc4b2611abbc",
        "savedProductCode": null
    },
    "109": {
        "__attributes__": "76c21af95c62bd1bfbf36e69771fcaec936c63b3",
        "savedProductCode": null
    },
    "110": {
        "__attributes__": "4e994448f135a5eaee787164853348ed7a3a5d78",
        "savedProductCode": null
    }
}
```