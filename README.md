# ANGULAR PAGINATION / ng-pagination

Pagination directive for angular (1.x.x).

**Our key features**  
- native parts mechanism: load your locale files using complex url templates like `/locale-{part}-{lang}.json`  
- parallel asynchronous loading: translations from part will be available and showed as soon as loaded  
- built-in caching of loaded translations and choosed language using browser localstorage, 
so next time user will see translations imidiatelly  
- configurable preload that load languages after primary language loaded,
so you can make switch of language more gentle  

### Usage

##### 01 Installation

To install `ng-pagination` you can use npm

```
npm install ng-pagination
```

or bower

```
bower install ng-pagination
```

or copy `directive.pagination.js` file from `dist` folder on [github](https://github.com/accetone/ng-pagination/blob/master/dist/directive.pagination.js).

##### 02 Embeding
Embed script to your HTML document anywhere after `angular` script:

```html
<script src="path/to/directive.pagination.js"></script>
```

Write activation method in your angular controller:

```javascript
angular
  .module('customApp')
  .controller('CustomController', ['$scope', customController]);

function customController($scope) {
  $scope.custom = {
    itemsCount: 30,
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


### Contribution

If you find error or want improve something, feel free to create issues and pull requests.

### License

Licensed under MIT.
