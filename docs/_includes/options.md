
## Cluckles Editor Options

There are options that can be provided when a ClucklesEditor instance is created and are as follows:

### Misc

Miscellaneous Options

| Field         | Type     | Default            | Desc                                                                                  |
| ------------- |:--------:| ------------------ | ------------------------------------------------------------------------------------- |
| delay         | `number` | 750 (milliseconds) | Milliseconds delay between refresh updates                                            |
| undoSize      | `Number` | 10                 | Number of items to keep in the Undo history                                           |
| embedSelector | `string` |                    | Will set this element to the height of the editor, if editor is in an embedded object |

## Scope

The Scope option controls whether or not to limit the CSS generated by Cluckles to a given Scope.
When a `selector` is provided, the CSS generated will be prefixed with the selector (and similarly when the `customCss` and `customLess` options are set to `true`)

| Field      | Type      | Default | Desc                                                                           |
| ---------- |:---------:| ------- | ------------------------------------------------------------------------------ |
| selector   | `string`  |         | The CSS Selector to prefix the Compiled CSS selectors with                     |
| customCss  | `boolean` |         | When set to `true`, the CSS will be prefixed with the selector                 |
| customLess | `boolean` |         | When set to `true` the Less is compiled to CSS then prefixed with the selector |

### Theme

Location to find the theme file to start editing (If editing existing theme).

| Field | Type     | Default | Desc                         |
| ----- |:--------:| ------- | ---------------------------- |
| url   | `string` |         | URL to locate the theme file |


### Export

An export object can be provided to control the exporting options.

| Field  | Type     | Default | Desc                                                           |
| ------ |:--------:| ------- | -------------------------------------------------------------- |
| target | `string` | 'body'  | Optional General DOM Element target, to append Export links to |

### Export Json

The export.json object can be provided to configure the options for Downloading the theme modifications in JSON format.  
The DOM node to append the export as json link, the id and the text of the link can be customised.

| Field  | Type     | Default              | Desc                                          |
| ------ |:--------:| -------------------- | --------------------------------------------- |
| target | `string` | export.target        | DOM Element target to append json Export link |
| id     | `string` | 'download_json_link' | ID attribute to set on the json Export link   |
| text   | `string` | 'Download Json'      | Text content for the json Export link         |

### Export Css

The export.css object can be provided to configure the options for Downloading the Compiled Theme in Css format. See `ClucklesEditor#setupPostProcessor`  
The DOM node to append the export as css link, the id and the text of the link can be customised.

| Field  | Type     | Default             | Desc                                         |
| ------ |:--------:| ------------------- | -------------------------------------------- |
| target | `string` | export.target       | DOM Element target to append css Export link |
| id     | `string` | 'download_css_link' | ID attribute to set on the css Export link   |
| text   | `string` | 'Download Css'      | Text content for the css Export link         |

#### Export Save

The export.save object can be provided to configure the options for Saving the theme
modifications (as JSON) to an external URL.

The DOM node to append the save link, the id and the text of the link can be customised.  

The url and method can be provided to alter the HTTP method and the location the changes are send.  

An optional success callback can also be provided to fire when the changes have been successfully received by the remote URL.

| Field          | Type       | Default           | Desc                                          |
| -------------- |:----------:| ----------------- | --------------------------------------------- |
| format         | `Array`    | `json`            | The formats to include in the export          |
| target         | `string`   | export.target     | DOM Element target to append save Export link |
| url (required) | `string`   |                   | URL to send the modified theme changes        |
| method         | `string`   | `POST`            | HTTP method for the save request              |
| callback       | `function` |                   | Optional success save callback                |
| id             | `string`   | 'save_theme_link' | ID attribute to set on the save Export link   |
| text           | `string`   | 'Save Theme'      | Text content for the save Export link         |