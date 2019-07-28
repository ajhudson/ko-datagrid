ko.components.register('simple-bootstrap-data-grid', {
    viewModel: function(params) {
        var gridData = params.hasOwnProperty("data") ? params.data : {};
        var pageSize = params.hasOwnProperty("pageSize") ? params.pageSize : data().length;
        var currentPage = ko.observable(1);
        var sortBy = ko.observable("");
        var sortIsDescending = ko.observable(false);
        
        var maxPages = ko.computed(function() {
            return Math.round(gridData().length / pageSize());
        });

        var startRow = ko.computed(function() {
            return (currentPage() * pageSize()) - pageSize();
        });

        var endRow = ko.computed(function() {
            return (startRow() + pageSize()) - 1;
        });

        var listOfPageNumbers = ko.computed(function() {
            
            var pages = [];
            for (var i = 0; i < maxPages(); i++) {
                pages.push(i + 1);
            }

            return pages;
        });

        if (!gridData().length) {
            return;
        }

        var gotoPage = function(requestedPage) {
            currentPage(requestedPage);
        }

        var resortByColumnName = function(columnName) {

            if (columnName === sortBy()) {
                var isDescending = sortIsDescending();
                sortData(columnName, !isDescending);
                sortIsDescending(!isDescending);
            } else {
                sortData(columnName, false);
                sortBy(columnName);
                sortIsDescending(false);
            }
        }

        var columnHeadings = getColumnHeadings();

        function getColumnHeadings() {
            var firstRow = gridData()[0];
            var cols = [];

            for (var c in firstRow) {
                cols.push(c);
            }

            return cols;
        }

        function sortData(propertyName, isDescending) {
            return gridData.sort(function (a, b) {
                if (a[propertyName] === b[propertyName]) {
                    return 0;
                }
        
                if (a[propertyName] < b[propertyName]) {
                    return isDescending ? 1 : -1;
                }
        
                return isDescending ? -1 : 1;
            });
        }

        return {
            columnHeadings: columnHeadings,
            gridData: gridData,
            currentPage: currentPage,
            maxPages: maxPages,
            startRow: startRow,
            endRow: endRow,
            listOfPageNumbers: listOfPageNumbers,
            gotoPage: gotoPage,
            resortByColumnName: resortByColumnName,
            sortBy: sortBy,
            sortIsDescending: sortIsDescending
        }
    },
    template:
        '\
        <div class="container">\
            <div class="row">\
                <p>Start row: <span data-bind="text: startRow"></span>. End row: <span data-bind="text: endRow"></span></p>\
                <p>Sorted by: <span data-bind="text: sortBy().length ? sortBy : \'N/A\'"></span> (<span data-bind="text: sortIsDescending() === true? \'descending\' : \'ascending\'"></span>)</p>\
                <table class="table">\
                    <thead>\
                        <tr data-bind="foreach: columnHeadings">\
                            <th><a href="#" data-bind="text: $data, click: function() { $parent.resortByColumnName($data); }"></a></th>\
                        </tr>\
                    </thead>\
                    <tbody data-bind="foreach: { data: gridData, as: \'gridData\' }">\
                        <!-- ko if: $index() >= $parent.startRow() && $index() <= $parent.endRow() -->\
                        <tr data-bind="foreach: { data: Object.keys(gridData), as: \'_propKey\' }">\
                            <td data-bind="text: gridData[_propKey]"></td>\
                        </tr>\
                        <!-- /ko -->\
                    </tbody>\
                </table>\
            </div>\
            <div class="row center">\
                <ul class="pagination" data-bind="foreach: listOfPageNumbers">\
                    <li data-bind="css: { \'active\': $parent.currentPage() == $data }">\
                        <a href="#" data-bind="text: $data, click: function() { $parent.gotoPage($data); }"></a><li>\
                    </li>\
                </ul>\
                <p>Page <span data-bind="text: currentPage"></span> of <span data-bind="text: maxPages"></span></p>\
            </div>\
        </div>\
        '
})