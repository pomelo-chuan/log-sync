# Overview

Copy your log from browser to terminal.

<div style="display: flex; justify-content: center;">
    <img src="./images/IMG_3980.JPG" width="200" />
    <img src="./images/terminal.png" width="400" />
</div>


# Getting started

## 1. Install log-sync via npm

```bash
$ npm install web-log-sync --saveDev
```

## 2. Add client script in your html

```html
<script src="path/to/dist/log-sync.min.js"></script>
```

## 3. Add **log-sync** command in you npm scripts

```bash
$ log-sync & npm run dev
```

# You can assign the port

Port in your html

```html
<script src="path/to/dist/log-sync.min.js?prefix=[log sync]&port=8080"></script>
```

Port in npm scripts

```bash
$ log-sync -p 8080 & npm run dev
```

### notice: Port in html and npm scripts must be the same one.

# You can assign the prefix in terminal output

```html
<script src="path/to/dist/log-sync.min.js?prefix=[Lovely Cat]"></script>
``

# License

log-sync is available under the MIT License.