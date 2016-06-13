(function () {
    'use strict';

    angular
        .module('ng-pagination', [])
        .directive('pagination', ['$location', pagination]);

    function pagination($location) {
        return {
            restrict: 'E',
            scope: {
                'count': '=',
                'take': '=',
                'activate': '&',
                'maxSize': '=?',
                'hideArrows': '=?'
            },
            template: template,
            link: function(scope, element) {
                var activate = scope.activate();
                var queryPage = $location.search().page;
                var current = queryPage ? parseInt(queryPage) : 1;
                var pagesCount;

                activate(current, scope.take);

                scope.$watchGroup(['take', 'count', 'maxSize', 'hideArrows'], rebuild);
                scope.isCurrent = isCurrent;
                scope.isDisabled = isDisabled;
                scope.pages = [];
                scope.toPage = toPage;

                scope.$on('$locationChangeSuccess', locationChanged);

                function isCurrent(page) {
                    return page.value === current;
                }

                function isDisabled(page) {
                    return page.type === 'separator'
                        || (page.type === 'prev' && current === 1)
                        || (page.type === 'next' && current === pagesCount);
                }

                function toPage(page) {
                    if (page.value === current || page.type === 'separator') return;


                    if (page.type === 'page') {
                        current = page.value;
                    }
                    else if (page.type === 'prev') {
                        if (current > 1) current--;
                        else return;
                    }
                    else if (page.type === 'next') {
                        if (current < pagesCount) current++;
                        else return;
                    }

                    activate(current, scope.take);
                    rebuild();
                }

                function rebuild() {
                    var options = buildOptions();
                    var pages = calc(options);

                    if (!pages) {
                        scope.pages = [];
                        return;
                    }

                    pagesCount = pages.count;
                    scope.pages = generate(pages, options);
                    $location.search('page', current);
                }

                function locationChanged() {
                    var page = parseInt($location.search().page);
                    if (!page) return;

                    scope.toPage({ type: 'page', value: page });
                }

                function buildOptions() {
                    var options = {
                        count: scope.count,
                        take: scope.take,
                        maxSize: 11,
                        current: current,
                        hideArrows: scope.hideArrows
                    };

                    if (scope.maxSize) {
                        if (scope.maxSize < 7) options.maxSize = 7;
                        else options.maxSize = scope.maxSize;
                    }

                    return options;
                }

                function calc(options) {
                    var pages = { };

                    pages.count = Math.ceil(options.count / options.take);

                    if (!pages.count || pages.count === 1) return;

                    if (options.maxSize % 2 === 0) {
                        pages.cellsLeft = options.maxSize / 2 - 1;
                        pages.cellsRight = options.maxSize / 2;
                    }
                    else {
                        pages.cellsLeft = (options.maxSize - 1) / 2;
                        pages.cellsRight = (options.maxSize - 1) / 2;
                    }

                    if (!options.hideArrows) {
                        pages.cellsLeft--;
                        pages.cellsRight--;
                    }

                    if (options.current > pages.cellsLeft + 1) pages.cellsLeft--;
                    if (options.current > pages.cellsLeft + 1) pages.cellsLeft--;
                    if (options.current < pages.count - pages.cellsRight) pages.cellsRight--;
                    if (options.current < pages.count - pages.cellsRight) pages.cellsRight--;

                    pages.lo = options.current - pages.cellsLeft;
                    pages.hi = options.current + pages.cellsRight;

                    if (pages.lo < 1)
                    {
                        pages.hi += 1 - pages.lo;
                        pages.lo = 1;
                    }

                    if (pages.hi > pages.count)
                    {
                        pages.lo -= pages.hi - pages.count;
                        pages.hi = pages.count;
                    }

                    return pages;
                }

                function generate(pages, options) {
                    var list;

                    if (pages.count <= options.maxSize) list = generateFlat(pages);
                    else list = generateFull(pages);

                    if (!options.hideArrows) {
                        list.unshift({ type: 'prev', value: '<' });
                        list.push({ type: 'next', value: '>' });
                    }

                    return list;
                }

                function generateFlat(pages) {
                    var list = [];

                    for (var i = 1; i <= pages.count; i++) {
                        list.push({ type: 'page', value: i });
                    }

                    return list;
                }

                function generateFull(pages) {
                    var list = [];

                    if (pages.lo > 1) list.push({ type: 'page', value: 1 });
                    if (pages.lo > 2) list.push({ type: 'separator', value: '...' });

                    for (var i = pages.lo; i <= pages.hi ; i++)
                    {
                        if (i <= 0 || i > pages.count) continue;
                        list.push({ type: 'page', value: i })
                    }

                    if (pages.hi < pages.count - 1) {
                        list.push({ type: 'separator', value: '...' })
                    }

                    if (pages.hi < pages.count) {
                        list.push({ type: 'page', value: pages.count });
                    }

                    return list;
                }
            }
        }
    }

    function template() {
        return '<div class="pagination">'
            + '<div class="page"'
            + 'ng-repeat="page in pages"'
            + 'ng-class="{ \'active\': isCurrent(page), \'disabled\': isDisabled(page) }"'
            + 'ng-click="toPage(page)">'
            + '{{ page.value }}'
            + '</div>'
            + '</div>';
    }
})();