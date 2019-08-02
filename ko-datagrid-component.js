function SimpleBootstrapDataGridViewModel(params) {
    var self = this;
    var id = params.id;
    var cssId = "#" + id;
    var gridData = params.hasOwnProperty("data") ? params.data : {};
    var pageSize = params.hasOwnProperty("pageSize") ? params.pageSize : data().length;
    self.currentPage = ko.observable(1);
    var sortBy = ko.observable("");
    var sortIsDescending = ko.observable(false);
    var columnHeadings = getColumnHeadings();
    
    self.maxPages = ko.computed(function() {
        return Math.ceil(gridData().length / pageSize());
    });

    self.startRow = ko.computed(function() {
        return (self.currentPage() * pageSize()) - pageSize();
    });

    var endRow = ko.computed(function() {
        return (self.startRow() + pageSize()) - 1;
    });

    var listOfPageNumbers = ko.computed(function() {
        
        var pages = [];
        for (var i = 0; i < self.maxPages(); i++) {
            pages.push(i + 1);
        }

        return pages;
    });

    var columnWidth = ko.computed(function() {
        return Math.ceil(100 / columnHeadings.length).toString() + "%";
    });

    if (!gridData().length) {
        return;
    }

    var gotoPage = function(requestedPage) {
        self.currentPage(requestedPage);
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
        gridData: gridData,
        currentPage: self.currentPage,
        maxPages: self.maxPages,
        startRow: self.startRow,
        endRow: endRow,
        listOfPageNumbers: listOfPageNumbers,
        gotoPage: gotoPage,
        resortByColumnName: resortByColumnName,
        sortBy: sortBy,
        sortIsDescending: sortIsDescending,
        columnWidth: columnWidth
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
                <p>Maximum pages: <span data-bind="text: maxPages"></p>\
                <table class="table">\
                    <thead>\
                        <tr data-bind="foreach: columnHeadings">\
                            <th data-bind="attr: { width: $parent.columnWidth }">\
                                <a href="#" data-bind="text: $data, click: function() { $parent.resortByColumnName($data); }, attr: { \'data-columnid\': $data }"></a>\
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
};

ko.components.register('simple-bootstrap-data-grid', simpleBootstrapDataGridComponent);