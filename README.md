# Gumget

This is an experimentation on creating [Gumroad-like open-in-the-page widget](https://gumroad.com/widgets).

## Usage

First, ensure to install all the necessary packages, by running:

```
$ npm install
```

After that, you can make any links a Gumget links by doing this:

```js
Gumget.init()
```

You may also pass custom configuration as follows:

```js
Gumget.init({
    domains: ["gumroad.com/l", "mycustomgummy.com"]
})
```

### Development setup

You can experiment with Gumget easily through this setup. Simply run:

```
$ npm run dev
```

That command should run a development server, and open an index page at [http://localhost:9000/](http://localhost:9000/) on your browser.

### Production setup

To bundle everything into one JS file, please execute the command below.

```
$ npm run build
```

You will find the bundled code inside of a `dist` folder.
