const foo = (() => Promise.resolve().then(() => console.log('Hello world')))();
