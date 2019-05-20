# [Classes](/) → [MivaLayout](/MivaLayout) → Properties


## $components <span class="type-hint-array">Array</span>

An array of all the [MivaLayoutComponent](/MivaLayoutComponent) instances within the layout, flattened.

---

## $layout <span class="type-hint-object">Object</span><span class="type-hint-array">Array</span>

The original layout array/object passed in the constructor.

---

## $instanceId <span class="type-hint-string">String</span>

The ID used to store the layout instance in the [$instanceCache](/MivaLayout/properties#instancecache-array).

---

## components <span class="type-hint-array">Array.&lt;MivaLayoutComponentTree&gt;</span>

The optimized array layout via a [MivaLayoutComponentTree](/MivaLayoutComponentTree/) instance.

---

## options <span class="type-hint-object">Object</span>

Structure containing the currently active [options](/MivaLayout#options).

---

## store <span class="type-hint-object">Object</span>

The current and active Store Object. Created after running the [createStore](/MivaLayout/methods#createStore) method.

!!! note "Developer Note"
    The `store` property will __NOT__ be available until __AFTER__ calling the [createStore](/MivaLayout/methods#createStore) method.

---

## settings <span class="type-hint-object">Object</span> <span class="type-hint-object">Object.&lt;MivaLayoutComponent&gt;</span>

The attributes or full object of the found [Settings Component](/MivaLayout/#the-settings-component) instance. View available [options](/MivaLayout#options) to control the settings component options.

!!! note "Developer Note"
    The `settings` property will __NOT__ be available if the settings component was not found.


---

## Static Properties

Properties that can be accessed directly via the `MivaLayout` global (not an instance property). Like `MivaLayout.$instanceCache`.

### $instanceCache <span class="type-hint-array">Array</span>

A global array of `MivaLayout` instances used to improve performance on internal function calls between [MivaLayoutComponent](/MivaLayoutComponent) instances.

---