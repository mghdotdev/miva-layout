# [Classes](/) → MivaLayout

---

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, quam, quia! Doloribus nisi praesentium placeat dolores repudiandae pariatur, aspernatur facere autem! Maxime, iure eaque! Laboriosam quasi, harum quod facilis qui.

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
| configComponentCode | `:::js 'config'` | A string representing what `type` of component to search for within the Layout for use in the Config slot. |
| exposeFullConfigComponent | `:::js false` | Whether or not to expose the full Config component or only the attribute tree. Defaults to only exposing the attribute tree. |
| pullConfigComponent | `:::js true` | Whether or not to remove the Config component when found within the Layout. Defaults to `:::js true`. |
| suppressWarnings | `:::js false` | Suppresses all warnings outputted to the console. Defaults to `:::js false`.  |

---

## Examples