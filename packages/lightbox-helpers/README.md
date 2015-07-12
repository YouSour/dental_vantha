# Lightbox Helpers

### Install

```js
meteor add theara:lightbox-helpers
```

### Usage

```js
// in template
{{lightbox url="img-url" name="img-name" title="img-title" [attachment="true"]}}

// in js
lightbox('img-url', 'img-name', 'img-title', [attachment=boolean], [safeString=boolean]);
// Default attachment = false, safeString = false
```

If you have a group of related images that you would like to combine into a set,
please use the same name
```js
{{lightbox url="img-url" name="rabbit" title="img-title"}}
{{lightbox url="img-url" name="rabbit" title="img-title"}}
{{lightbox url="img-url" name="rabbit" title="img-title"}}
```

### Changelog
- v 0.0.1 (2015-07-12)
    - init
