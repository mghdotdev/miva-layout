# [Classes](/) → [MivaLayout](/MivaLayout) → Methods

## `createStore( defaultComponentStateData );`

Create a MivaLayout Store Object. A Store Object is a dictionary style object that uses each individual component's current `componentIdentifer` setting as a key. It allows the developer to store relevant data in a global location. This simplifies state management when working with a front-end framework like Angular, Vue or React.

### Parameters

| Param | Type | Details |
| --- | --- | --- |
| defaultComponentStateData | <span class="type-hint-function">Function</span><span class="type-hint-object">Object</span> | Accepts either an object or a function. The value returned from the function will be used as the `defaultState` within the layout for each Component Data Object within the Store Object. |

!!! Note "Developer Note"
    When using an object literal all components will __NOT__ share the same reference to the object. The object literal will be cloned before assigning to each component slot. If you would like to share state between components, use the [syncState](#syncstate-components) function.

### Returns

<span class="type-hint-object">Object.&lt;MivaLayout&gt;</span> &emsp;&mdash;&emsp; Returns the current MivaLayout instance to allow method chaining.

### Examples

```js tab="as Function"
var layout = new MivaLayout( json );

// creating the store with a function
layout.createStore(function( component ) {
    
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

// creating store with a basic object
layout.createStore( { key: 'value' } );

// - output
{
    101: { key: 'value', ... },
    102: { key: 'value', ... },
    103: { key: 'value', ... },
    ...
}
```

---

## `mergeStore( storeObject, componentIdentifierMap );`

Attempts to merge the current store with the passed parameter. The attributes hash stored in the `:::js __attributes__` property on a Store Object is checked to determine if a Component's attributes have changed from the server. This function is useful when storing the Store Object in `:::js sessionStorage`, `:::js localStorage` or a similar method.

### Parameters

| Param | Type | Details |
| --- | --- | --- |
| storeObject | <span class="type-hint-object">Object</span> | The Store Object to be merged. |

### Returns

<span class="type-hint-object">Object.&lt;MivaLayout&gt;</span> &emsp;&mdash;&emsp; Returns the current MivaLayout instance to allow method chaining.

---

## `getComponentState( componentIdentifer );`

Retreive a specific Component's state data from the Store Object by the current `componentIdentifer` setting.

### Parameters

| Param | Type | Details |
| --- | --- | --- |
| componentIdentifer | <span class="type-hint-object">Mixed</span> | An ID / code (componentIdentifier) present within the Store Object. |

### Returns

<span class="type-hint-object">Object</span><span class="type-hint-undefined">undefined</span> &emsp;&mdash;&emsp; The component data object. <span class="type-hint-undefined">undefined</span> if not found.

---

## `setComponentState( componentIdentifer, componentState );`

Overwrite a specific component's state data object by the current `componentIdentifer` setting.

### Parameters

| Param | Type | Details |
| --- | --- | --- |
| componentIdentifer | <span class="type-hint-object">Mixed</span> | An ID / code (componentIdentifier) present within the Store Object. |
| componentState | <span class="type-hint-object">Object</span> | A component state data object. Must contain a hash of the component's attributes object at the `:::js __attributes__` key. |

### Returns

<span class="type-hint-object">Object.&lt;MivaLayout&gt;</span> &emsp;&mdash;&emsp; Returns the current MivaLayout instance to allow method chaining.

---

## `syncComponentStates( components );`

Overwrites the passed array of `MivaLayoutComponent` instances current Component State Data with the first component within the array. The objects will be linked by reference and changes made to one will update all.

### Parameters

| Param | Type | Details |
| --- | --- | --- |
| components | <span class="type-hint-array">Array.&lt;MivaLayoutComponent&gt;</span> | Array of `MivaLayoutComponent` instances to be synced. |

### Returns

<span class="type-hint-object">Object.&lt;MivaLayout&gt;</span> &emsp;&mdash;&emsp; Returns the current MivaLayout instance to allow method chaining.

---

## `exportStore( [ pretty ] );`

Returns a JSON string of the current Store Object. Use the optional `pretty` parameter to format the JSON string. 

### Parameters

| Param | Type | Details |
| --- | --- | --- |
| pretty _(optional)_ | `:::js Boolean` | Add a `\t` character as the whitespace insertion character. Defaults to `false`. Optional. |

### Returns

<span class="type-hint-string">String</span> &emsp;&mdash;&emsp; Stringified JSON Store Object.

---

## Static Methods

Functions/Methods that will be accessable directly from the `MivaLayout` global (not an instance property). Like `new MivaLayout.Component( ... )`.

### `Component`

A global reference to the [MivaLayoutComponent](/MivaLayoutComponent) class.

### `ComponentTree`

A global reference to the [MivaLayoutComponentTree](/MivaLayoutComponentTree) class.

---