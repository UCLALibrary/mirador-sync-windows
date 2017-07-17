# mirador-sync-windows

When comparing one or more nearly identical images (for example, different spectral images of the same object), it is useful to apply actions to more than one window at a time. This could be a zoom or pan action, an image manipulation action, a page turn action, etc. This Mirador plugin enables this.

## Setup

Clone this repository and do:

```bash
npm install
gulp
```

Now look in the 'dist/' folder. Drop these files into your Mirador build output directory and point your webpage to them:

```html
<!DOCTYPE html>
<html>
    <head>
        ...
        <link rel="stylesheet" type="text/css" href="mirador-combined.css">
        <link rel="stylesheet" type="text/css" href="MiradorSyncWindows.min.css">
        ...
    </head>
    <body>
        <div id="viewer"></div>

        <script src="mirador.js"></script>
        <script src="MiradorSyncWindows.min.js"></script>

        <script type="text/javascript">

        $(function() {
            Mirador({
                ...
```
