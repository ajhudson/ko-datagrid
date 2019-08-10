function SimpleBootstrapDataGridViewModel(params) {
    var self = this;
    var id = params.id;
    var cssId = "#" + id;
    var gridData = params.hasOwnProperty("data") ? params.data : {};
    var pageSize = params.hasOwnProperty("pageSize") ? params.pageSize : data().length;
    var friendlyColumnHeadings = params.hasOwnProperty("columnNames") ? params.columnNames : [];
    var currentPage = ko.observable(1);
    var sortBy = ko.observable("");
    var sortIsDescending = ko.observable(false);
    var columnHeadings = getColumnHeadings();
    
    var maxPages = ko.computed(function() {
        return Math.ceil(gridData().length / pageSize());
    });

    var startRow = ko.computed(function() {
        return (currentPage() * pageSize()) - pageSize();
    });

    var endRow = ko.computed(function() {
        return (startRow() + pageSize()) - 1;
    });

    var showPagination = ko.computed(function() {
        return pageSize() < gridData().length;
    });

    var listOfPageNumbers = ko.computed(function() {
        var pages = [];
        for (var i = 0; i < maxPages(); i++) {
            pages.push(i + 1);
        }

        return pages;
    });

    var getFriendlyColumnNameByIndex = function(index) {
        return friendlyColumnHeadings[ko.utils.unwrapObservable(index)];
    }

    var columnWidth = ko.computed(function() {
        return Math.ceil(100 / columnHeadings.length).toString() + "%";
    });

    if (!gridData().length) {
        return;
    }

    var gotoPage = function(requestedPage) {
        currentPage(requestedPage);
    }

    var resortByColumnName = function(columnName) {
        var marginLeftSetting = 5;
        $(cssId).find("table > thead > tr > th > a ~ span[class^='glyphicon glyphicon-sort-by-attributes']").remove();
        var el = $(cssId).find("table > thead > tr > th > a[data-columnid='" + columnName + "']");

        if (columnName === sortBy()) {
            var isDescending = sortIsDescending();
            sortData(columnName, !isDescending);
            sortIsDescending(!isDescending);
            var sortingGlyphicon = "glyphicon glyphicon-sort-by-attributes" +  (sortIsDescending() ? "-alt" : "");
            el.after("<span class='" + sortingGlyphicon + "' style='margin-left: " + marginLeftSetting + "px;'></span>");
        } else {
            sortData(columnName, false);
            sortBy(columnName);
            sortIsDescending(false);
            el.after("<span class='glyphicon glyphicon-sort-by-attributes' style='margin-left: " + marginLeftSetting + "px;'></span>");
        }
    }

    generatePaginationWidgetContent();

    function generatePaginationWidgetContent() {
        var spread = 3;
        var offset = Math.floor((spread - 1) / 2);
        var start = currentPage() - offset;
        var end = currentPage() + offset;

        // ensure sure start does not fall out of range
        if (start <= 1) {
            start = 1;
        }

        // ensure end does not fall out of range
        if (end >= maxPages()) {
            end = maxPages;
        }

        // ensure the middle bit always has 3 pages
        var spreadCount = end - start;
        var missingSpreadCount = spread - spreadCount;

        if (spreadCount < spread) {
            end += missingSpreadCount;
        }
        
        var pages = [1]; // always put the first page in
        for (var i = start; i <= end; i++) {
            pages.push(i);
        }
        pages.push(maxPages());

        var pagination = pages.filter(function(val, ind, arr) {
            return arr.indexOf(val) == ind;
        });

        pagination.splice(1, 0, null);
        pagination.splice(-1, 0, null);

    }


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
        id: id,
        columnHeadings: columnHeadings,
        friendlyColumnHeadings: friendlyColumnHeadings,
        getFriendlyColumnNameByIndex: getFriendlyColumnNameByIndex,
        gridData: gridData,
        currentPage: currentPage,
        maxPages: maxPages,
        startRow: startRow,
        endRow: endRow,
        listOfPageNumbers: listOfPageNumbers,
        gotoPage: gotoPage,
        resortByColumnName: resortByColumnName,
        sortBy: sortBy,
        sortIsDescending: sortIsDescending,
        columnWidth: columnWidth,
        showPagination: showPagination,
        generatePaginationWidgetContent: generatePaginationWidgetContent
    }
}

var simpleBootstrapDataGridComponent = {
    viewModel: SimpleBootstrapDataGridViewModel,
    template:
        '\
        <div class="container" data-bind="attr: { id: id }">\
            <div class="row">\
                <p>Start row: <span data-bind="text: startRow"></span>. End row: <span data-bind="text: endRow"></span></p>\
                <p>Sorted by: <span data-bind="text: sortBy().length ? sortBy : \'N/A\'"></span> (<span data-bind="text: sortIsDescending() === true? \'descending\' : \'ascending\'"></span>)</p>\
                <p>Maximum pages: <span data-bind="text: maxPages"></span></p>\
                <p>Show pagination: <span data-bind="text: showPagination"></span> </p>\
                <table class="table">\
                    <thead>\
                        <tr data-bind="foreach: columnHeadings">\
                            <th data-bind="attr: { width: $parent.columnWidth }">\
                                <a href="#" data-bind="text: $parent.getFriendlyColumnNameByIndex($index), click: function() { $parent.resortByColumnName($data); }, attr: { \'data-columnid\': $data }"></a>\
                            </th>\
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
            <div class="row center" data-bind="visible: showPagination">\
                <ul class="pagination" data-bind="foreach: listOfPageNumbers">\
                    <li data-bind="css: { \'active\': $parent.currentPage() == $data }">\
                        <a href="#" data-bind="text: $data, click: function() { $parent.gotoPage($data); }"></a><li>\
                    </li>\
                </ul>\
                <p>Page <span data-bind="text: currentPage"></span> of <span data-bind="text: maxPages"></span></p>\
            </div>\
            <div class="row center" data-bind="visible: showPagination">\
            </div>\
        </div>\
        '
};

ko.components.register('simple-bootstrap-data-grid', simpleBootstrapDataGridComponent);