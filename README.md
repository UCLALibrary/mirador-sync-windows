# mirador-synchronized-windows

When comparing one or more nearly identical images (for example, different spectral images of the same object), it is useful to apply actions to more than one window at a time. This could be a zoom or pan action, an image manipulation action, a page turn action, etc. This Mirador plugin enables this.

## Setup
Drop these files into your Mirador build output directory and point your webpage to them:

```html
<!DOCTYPE html>
<html>
    <head>
        ...
        <link rel="stylesheet" type="text/css" href="mirador-combined.css">
        <link rel="stylesheet" type="text/css" href="MiradorSynchronizedWindows.css">
        ...
    </head>
    <body>
        <div id="viewer"></div>
        <script src="mirador.js"></script>

		<!-- All three scripts are required for this feature to work. -->
        <script src="MiradorSynchronizedWindows.js"></script>
        <script src="synchronizedWindowsController.js"></script>
        <script src="synchronizedWindowsPanel.js"></script>

        <script type="text/javascript">

        $(function() {
            Mirador({
                ...
```
