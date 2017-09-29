# Promise的用法
简介：将来只会变得越来越流行、普遍，非常重要，所有的前端开发人员都将用到它。另一个值得注意的是，Node.js是基于Promises的平台(很显然，Promise是它的一个核心特征)。

## promise 实例

```js
//new Promise()构造器可以用在传统的异步任务中，就像以前 setTimeout 和 XMLHttpRequest 的用法一样。一个新的 Promise 使用 new 关键字生成，同时，这个 Promises 提供了 resolve 和 reject 函数让我们执行回调操作：
    var p = new Promise(function(resolve, reject) {
    // Do an async task async task and then...
    if(/* good condition */) {
    resolve('Success!');
    }
    else {
    reject('Failure!');
    }
    });
    p.then(function() { 
    /* do something with the result */
    }).catch(function() {
    /* error */
    })

```
## Promise.resolve() 和 Promise.reject() 可以直接被调用。有时候，当判断出 promise 并不需要真正执行时，我们并不需要 使用 new 创建 Promise 对象，而是可以直接调用 Promise.resolve() 和 Promise.reject()。比如：

```js
    var userCache = {};
function getUserDetail(username) {
 // In both cases, cached or not, a promise will be returned
 if (userCache[username]) {
  // Return a promise without the "new" keyword
  return Promise.resolve(userCache[username]);
 }
 // Use the fetch API to get the information
 // fetch returns a promise
 return fetch('users/' + username + '.json')
  .then(function(result) {
   userCache[username] = result;
   return result;
  })
  .catch(function() {
   throw new Error('Could not find user: ' + username);
  });
}
```

## then 方法

###所有的 promise 对象实例里都有一个 then 方法，它是用来跟这个 promise 进行交互的。首先，then 方法会缺省调用 resolve() 函数:

```js
    new Promise(function(resolve, reject) {
    // A mock async action using setTimeout
    setTimeout(function() { resolve(10); }, 3000);
    })
    .then(function(result) {
    console.log(result);
    });
    //then 回调动作的触发时机是 promise 被执行完。我们还可以串联 then 方法执行回调操作：
    new Promise(function(resolve, reject) { 
    // A mock async action using setTimeout
    setTimeout(function() { resolve(10); }, 3000);
    })
    .then(function(num) { console.log('first then: ', num); return num * 2; })
    .then(function(num) { console.log('second then: ', num); return num * 2; })
    .then(function(num) { console.log('last then: ', num);});
```
###如果一个 promise 已经执行完成，单 then 被再次调用时，回调动作将会被再次执行。而如果这个 promise 里执行的是reject 回调函数，这是再调用 then 方法，回调函数将不会被执行。

##catch 方法

```js
    //catch 当一个 promise 被拒绝(reject)时,catch 方法会被执行：
    new Promise(function(resolve, reject) {
    // A mock async action using setTimeout
    setTimeout(function() { reject('Done!'); }, 3000);
    })
    .then(function(e) { console.log('done', e); })
    .catch(function(e) { console.log('catch: ', e); });
```
###通常我们在 reject 方法里处理执行失败的结果，而在catch 里执行异常结果：reject(Error('Data could not be found'));

##Promise.all 方法

###在我们的异步调用时经常有这样一种场景：我们需要同时调用多个异步操作，但希望只有等所有的操作都完成后，我们才去执行响应操作——这就是 Promise.all 的作用。 Promise.all 方法可以接收多个 promise 作为参数，以数组的形式，当这些 promise 都成功执行完成后才调用回调函数。

```js
Promise.all([promise1, promise2]).then(function(results) {
 // Both promises resolved
})
.catch(function(error) {
 // One or more promises was rejected
});
```

###一个很好的能演示 Promise.all 用法的例子是，执行多个 AJAX 操作(通过 fetch) 调用:

```js
var request1 = fetch('/users.json');
var request2 = fetch('/articles.json');
Promise.all([request1, request2]).then(function(results) {
 // Both promises done!
});
```
###我们还可将fetch和电池状态API混合一起执行，因为它们返回的都是 promise：

```js
Promise.all([fetch('/users.json'), navigator.getBattery()]).then(function(results) {
 // Both promises done!
});
```

###一旦 promise 里调用了reject函数，也就是执行被拒绝了，没有能够正常完成，情况会有些复杂。一旦 promise 被拒绝，catch 方法会捕捉到首个被执行的reject函数：

```js
var req1 = new Promise(function(resolve, reject) { 
 // A mock async action using setTimeout
 setTimeout(function() { resolve('First!'); }, 4000);
});
var req2 = new Promise(function(resolve, reject) { 
 // A mock async action using setTimeout
 setTimeout(function() { reject('Second!'); }, 3000);
});
Promise.all([req1, req2]).then(function(results) {
 console.log('Then: ', one);
}).catch(function(err) {
 console.log('Catch: ', err);
});
 
 //Promise.all 是非常重要的接口，将会在很多新诞生的 promise API中扮演重要的作用。
```

##Promise.race方法

###Promise.race 是一个有趣的函数——它不是等待所有的 promise 被resolve 或 reject，而是在所有的 promise 中只要有一个执行结束，它就会触发：

```js
var req1 = new Promise(function(resolve, reject) { 
 // A mock async action using setTimeout
 setTimeout(function() { resolve('First!'); }, 8000);
});
var req2 = new Promise(function(resolve, reject) { 
 // A mock async action using setTimeout
 setTimeout(function() { resolve('Second!'); }, 3000);
});
Promise.race([req1, req2]).then(function(one) {
 console.log('Then: ', one);
}).catch(function(one, two) {
 console.log('Catch: ', one);
});
```