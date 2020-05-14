const foo = (() => Promise.resolve().then(() => console.log('working')))();
