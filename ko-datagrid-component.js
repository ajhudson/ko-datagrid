ko.components.register('simple-bootstrap-data-grid', {
    viewModel: function(params) {
        var gridData = params.hasOwnProperty("data") ? params.data : {};
        var pageSize = params.hasOwnProperty("pageSize") ? params.pageSize : data().length;
        var currentPage = ko.observable(1);
        
        var maxPages = ko.computed(function() {
            return Math.round(gridData().length / pageSize());
        });

        var startRow = ko.computed(function() {
            return (currentPage() * pageSize()) - pageSize();
        });

        var endRow = ko.computed(function() {
            return (startRow() + pageSize()) - 1;
        });

        var wibble = function(obj) {
            console.log(obj);
        }

        if (!gridData().length) {
            return;
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
    

        return {
            columnHeadings: columnHeadings,
            gridData: gridData,
            currentPage: currentPage,
            maxPages: maxPages,
            startRow: startRow,
            endRow: endRow,
            wibble: wibble
        }
    },
    template:
        '\
        <p>Start row: <span data-bind="text: startRow"></span>. End row: <span data-bind="text: endRow"></span>\
        <table class="table">\
            <thead>\
                <tr data-bind="foreach: columnHeadings">\
                    <th><a href="#" data-bind="text: $data"></a></th>\
                </tr>\
            </thead>\
            <tbody data-bind="foreach: { data: gridData, as: \'gridData\' }">\
                <!-- ko if: $index() >= $parent.startRow() && $index() <= $parent.endRow() -->\
                <tr data-bind="foreach: { data: Object.keys(gridData), as: \'_propKey\' }">\
                    <td data-bind="text: gridData[_propKey]"></td>\
                </tr>\
                <!-- /ko -->\
            </tbody>\
        </table><br />\
        <p>Page <span data-bind="text: currentPage"></span> of <span data-bind="text: maxPages"></span></p>\
        '
})