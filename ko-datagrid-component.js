ko.components.register('simple-bootstrap-data-grid', {
    viewModel: function(params) {

        console.log(params);

        var gridData = params.hasOwnProperty("data") ? params.data : {};
        var pageSize = params.hasOwnProperty("pageSize") ? params.pageSize : data().length;
        
        console.log(gridData());
        console.log("");

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

            console.log(cols);
            return cols;
        }
    

        return {
            columnHeadings: columnHeadings,
            gridData: gridData
        }
    },
    template:
        '<table class="table">\
            <thead>\
                <tr data-bind="foreach: columnHeadings">\
                    <th data-bind="text: $data"></th>\
                </tr>\
            </thead>\
            <tbody data-bind="foreach: { data: gridData, as: \'gridData\' }">\
                <tr data-bind="foreach: { data: Object.keys(gridData), as: \'_propKey\' }">\
                    <td data-bind="text: gridData[_propKey]"></td>\
                </tr>\
            </tbody>\
        </table>'
})