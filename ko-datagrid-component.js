ko.components.register('simple-bootstrap-data-grid', {
    viewModel: function(params) {

        var columnHeadings = [ "1st col", "2nd col" ];

        return {
            columnHeadings: columnHeadings
        }
    },
    template:
        '<table class="table">\
            <thead>\
                <th>col 1</th>\
                <th>col 2</th>\
            </thead>\
            <tbody>\
                <tr>\
                    <td>data 1</td>\
                    <td>data 2</td>\
                </tr>\
            </tbody>\
        </table>'
})