# ANGULAR PAGINATION / ng-pagination

Pagination directive for angular (1.x.x).

**Our key features**  
- nice UI with fixed count of elements, so your pagination never broke the design if you have a large amount of pages; you can try this feature on [demo page](http://accetone.github.io/ng-pagination-demo)
- saving current page to url query and use this on reload
- css free - you can stylize directive as you want 
- separators and navigation arrows
- lightweight, only 2.42 KB, this's cool, right? ;)
- that's all folks!

### Usage

##### 01 Installation

To install `ng-pagination` you can use npm

```
npm install ng-pagination
```

or copy `directive.pagination.js` file from `dist` folder on [github](https://github.com/accetone/ng-pagination/blob/master/dist/directive.pagination.js).

##### 02 Embeding
Embed script to your HTML document anywhere after `angular` script:

```html
<script src="path/to/directive.pagination.js"></script>
```

Write activation method in your angular controller. It will be called each time when current page changed, so you can load and show new portion of your data. Also activation method will be called once after directive initialized:

```javascript
angular
  .module('customApp')
  .controller('CustomController', ['$scope', customController]);

function customController($scope) {
  $scope.custom = {
    itemsCount: 42,
    take: 10,
  
    activatePage: activatePage
  };
  
  function activatePage(page) {
    // TODO: here you should process changing of current page
  }
}
```

Insert pagination directive into your markup:

```html
<pagination count="custom.itemsCount" take="custom.take" activate="custom.activatePage"></pagination>
```

### Options
Directive have 3 required attributes: `count`, `take` and `activate`.  
- `count` - total number of items that your want to paginate
- `take` - number of items per page
- `activate` - function that will be called when current page changed, also called once after directive initialized

Optional attributes:
- `max-size` - maximum count of elemetns (default = 11, min = 7)
- `hide-arrows` - hide navigation arrows (default = false)

You can configure template - find `template` function in directive file.

### Demo

You can see [demo](http://accetone.github.io/ng-pagination-demo) and [code](https://github.com/accetone/ng-pagination-demo)

### Contribution

If you find error or want improve something, feel free to create issues and pull requests.

### License

Licensed under MIT.
