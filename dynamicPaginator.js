function DynamicPaginator(maxPages, currentPage) {
    this.maxPages = maxPages;
    this.currentPage = currentPage;
    var offset = 1;
    var spread = (offset * 2) + 1;
    var self = this;

    var getDistinctValuesCallback = function(value, index, source) {
        return source.indexOf(value) === index;
    }

    var getPaginatorInfo = function() {

        var startRange = [];
        for (var i = 1; i <= spread; i++) {
            startRange.push(i);
        }

        var endRange = [];
        for (var i = (self.maxPages - spread) + 1; i <= self.maxPages; i++) {
            endRange.push(i);
        }

        // default 
        var start = [1, null];
        var middle = [self.currentPage - 1, self.currentPage, self.currentPage + 1];
        var end = [null, self.maxPages];

        var middleIntersectStartRange = middle.filter(function (e) {
            return startRange.indexOf(e) !== -1;
        });

        if (middleIntersectStartRange.length) {
            start = startRange.concat(middle).filter(getDistinctValuesCallback);
            middle = [null];
            end = [self.maxPages];
        }

        console.log(start);
        console.log(middle);
        console.log(end);

        return start.concat(middle, end);
    }

    return {
        getPaginatorInfo: getPaginatorInfo
    }
}