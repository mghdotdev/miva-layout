# [Classes](/) → MivaLayout

---

Main entry point for `miva-layout.js`. Optimizes the raw JSON output from the [Components & Layouts](https://github.com/tessguefen/Components-Layouts) module. The layout JSON is converted into a [MivaLayoutComponentTree](/MivaLayoutComponentTree) instance which is an array of [MivaLayoutComponent](/MivaLayoutComponentTree) instances. This class is also responsible for optimizing state management when using the Components & Layouts module with a front-end framework like Angular, Vue or React.

## Usage

```js
var layout = new MivaLayout( jsonObject [, options ] );
```

### Arguments

| Param | Type | Details |
| --- | --- | --- |
| layout | <span class="type-hint-object">Object</span> | A JSON object form of a loaded Layout. See [Examples](#examples) for an example of how to obtain this JSON object. |
| options _(optional)_ | <span class="type-hint-object">Object</span> | An optional configuration object that lets you customize the MivaLayout Class settings. |

### Options

| Key | Default | Details |
| --- | --- | --- |
| settingsComponentCode | `:::js 'settings'` | A string representing what `type` of component to search for within the Layout for use in the "settings" slot. |
| exposeFullSettingsComponent | `:::js false` | Whether or not to expose the full "settings" component or only the attribute tree. Defaults to only exposing the attribute tree. |
| pullSettingsComponent | `:::js true` | Whether or not to remove the "settings" component when found within the Layout. Defaults to `:::js true`. |
| suppressWarnings | `:::js false` | Suppresses all warnings outputted to the console. Defaults to `:::js false`.  |
| componentIdentifier |  `:::js 'code'` | The default property to access when attempting to load a component's state. |

---

## Features

### The "Settings" Component

The "settings" feature allows a developer to create a "top-level" component to store configuration or global layout data within the Layout. The "settings" component by default will be pulled from the `MivaLayoutComponentTree` it is housed in. The "settings" component can be any level deep within the Layout tree and only the first occurrence will be pulled and slotted into the `settings` property on the `MivaLayout` instance.

### Store/State Management

State management is a core feature of `miva-layout.js`. When creating an application with a Components & Layouts back-end you will often require data to be associated with certain components when in application runtime. The following methods are used to create, manipulate and retrieve the "State Object" and "Component State Data" objects from the property `store` stored within the `MivaLayout` instance.

* [createStore](/MivaLayout/methods/#createstore-defaultcomponentstatedata)
* [mergeStore](/MivaLayout/methods/#mergestore-stateobject)
* [getComponentState](/MivaLayout/methods/#getcomponentstate-componentid)
* [setComponentState](/MivaLayout/methods/#getcomponentstate-componentid)
* [syncComponentStates](/MivaLayout/methods/#synccomponentstates-components)
* [exportStore](/MivaLayout/methods/#exportstore-pretty)

---