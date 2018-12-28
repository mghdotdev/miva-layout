# Class: MivaLayout

---

## Overview

## Usage

```js
var layout = new MivaLayout( jsonObject [, options ] );
```

### Arguments

| Param | Type | Details |
| --- | --- | --- |
| layout | `:::js Object` | A JSON object form of a loaded Layout. See [Examples](/MivaLayout/examples) for an example of how to obtain this JSON object. |
| options _(optional)_ | `:::js Object` | An optional configuration object that lets you customize the MivaLayout Class settings. |

### Options

| Key | Default | Details |
| --- | --- | --- |
| configComponentCode | `:::js 'config'` | A string representing what `type` of component to search for within the Layout for use in the Config slot. |
| exposeFullConfigComponent | `:::js false` | Whether or not to expose the full Config component or only the attribute tree. Defaults to only exposing the attribute tree. |
| pullConfigComponent | `:::js true` | Whether or not to remove the Config component when found within the Layout. Defaults to `:::js true`. |
| suppressWarnings | `:::js false` | Suppresses all warnings outputted to the console. Defaults to `:::js false`.  |

## Methods

### `createState( defaultComponentStateData );`

Create a MivaLayout [State Object](/MivaLayout/StateObject/). A [State Object](/MivaLayout/StateObject/) is a dictionary style object that uses each individual component's ID as a key. It allows the developer to store relevant data in a global location. This simplifies state management when working with a front-end framework like Angular, Vue or React.

#### Parameters

| Param | Type | Details |
| --- | --- | --- |
| defaultComponentStateData | `:::js Function|Object` | Accepts either an object or a function. The value returned from the function will be used as the `defaultState` within the layout for each Component Data Object within the State Object. |

!!! Note "Developer Note"
    When using an object literal all components will __NOT__ share the same reference to the object. The object literal will be cloned before assigning to each component slot. If you would like to share state between components, use the [syncState](#syncstate-components) function.

#### Returns

`:::js undefined` &emsp;&mdash;&emsp; No return specified.

#### Examples

```js tab="as Function"
var layout = new MivaLayout( json );

// creating state with a function
layout.createState(function( component ) {
    
    // reference to each "component" within the layout

    if ( component.type == 'myComponentType' ) {

        return {
            myComponentData: 'Hello World!'
        };

    }

    return {};

});

// - output
{
    101: { myComponentData: 'Hello World!', ... },
    102: { ... },
    103: { ... },
    ...
}
```

```js tab="as Object"
var layout = new MivaLayout( json );

// creating state with a basic object
layout.createState( { key: 'value' } );

// - output
{
    101: { key: 'value', ... },
    102: { key: 'value', ... },
    103: { key: 'value', ... },
    ...
}
```

---

### `mergeState( stateObject );`

Attempts to merge the current state with the passed parameter. The attributes hash stored in the `:::js __attributes__` property on a [State Object](/MivaLayout/StateObject/) is checked to determine if a Component's attributes have changed from the server. This function is useful when storing the [State Object](/MivaLayout/StateObject/) in `:::js sessionStorage`, `:::js localStorage` or a similar method.

#### Parameters

| Param | Type | Details |
| --- | --- | --- |
| stateObject | `:::js Object` | The State Object to be merged. |

#### Returns

`:::js undefined` &emsp;&mdash;&emsp; No return specified.

---

### `getComponentState( componentId );`

Retreive a specific Component's state data from the [State Object](/MivaLayout/StateObject/) by ID.

#### Parameters

| Param | Type | Details |
| --- | --- | --- |
| componentId | `:::js Number` | A number representing a component's ID present within the State Object. |

#### Returns

`:::js Object|undefined` &emsp;&mdash;&emsp; The component data object. `:::js undefined` if not found.

---

### `setComponentState( componentId, componentState );`

Overwrite a specific component's state data object by ID.

#### Parameters

| Param | Type | Details |
| --- | --- | --- |
| componentId | `:::js Number` | A number representing a component's ID present within the State Object. |
| componentState | `:::js Object` | A component state data object. Must contain a hash of the component's attributes object at the `:::js __attributes__` key. |

#### Returns

`:::js undefined` &emsp;&mdash;&emsp; No return specified.

---

### `syncState( components );`

Overwrites the passed array of `MivaLayoutComponent` instances current Component State Data with the first component within the array. The objects will be linked by reference and changes made to one will update all.

#### Parameters

| Param | Type | Details |
| --- | --- | --- |
| components | `:::js Array.<MivaLayoutComponent>` | Array of `MivaLayoutComponent` instances to be synced. |

#### Returns

`:::js undefined` &emsp;&mdash;&emsp; No return specified.

---

### `exportState( [ pretty ] );`

Returns a JSON string of the current State Object. Use the optional `pretty` parameter to format the JSON string. 

#### Parameters

| Param | Type | Details |
| --- | --- | --- |
| pretty _(optional)_ | `:::js Boolean` | Add a `\t` character as the whitespace insertion character. Defaults to `false`. Optional. |

#### Returns

`:::js String` &emsp;&mdash;&emsp; Stringified JSON State Object.

---

### `toJSON();`

A special method that overwrites the default `:::js JSON.stringify` output. See [toJSON() Behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior) for more information.

#### Parameters

None.

#### Returns

`:::js undefined` &emsp;&mdash;&emsp; No return specified.


---