# [Classes](/) → [MivaLayout](/MivaLayout) → Properties


## $components <span class="type-hint-object">Object</span>

A dictionary style "flat" component list.

---

## $layout <span class="type-hint-object">Object</span><span class="type-hint-array">Array</span>

The original layout array/object passed in the constructor.

---

## defaultState <span class="type-hint-object">Object</span>

The initial State Object created after running the [createState](/MivaLayout/methods#createState) method.

---

## components <span class="type-hint-array">Array.&lt;MivaLayoutComponentTree&gt;</span>

The optimized array layout via a [MivaLayoutComponentTree](/MivaLayoutComponentTree/) instance.

---

## options <span class="type-hint-object">Object</span>

Structure containing the currently active options.

---

## state <span class="type-hint-object">Object</span>

The current and active State Object. Created after running the [createState](/MivaLayout/methods#createState) method.

---

!!! note "Developer Note"
    Both the [state](#state) and [defaultState](#defaultState) properties will __NOT__ be available until __AFTER__ calling the [createState](/MivaLayout/methods#createState) method.