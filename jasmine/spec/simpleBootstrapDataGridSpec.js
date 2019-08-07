describe("SimpleBootstrapDataGrid", function() {
    function Person(id, firstname, surname, city, country) {
        this.id = id;
        this.firstname = firstname;
        this.surname = surname;
        this.city = city;
        this.country = country;
    }

    var testData = [
        new Person(1, "Hasan", "Kasamali", "Mumbai", "India"),
        new Person(2, "James", "McCollom", "Bury", "UK"),
        new Person(3, "Ben", "Stokes", "Wellington", "New Zealand"),
        new Person(4, "Diego", "Simione", "Buenos Aires", "Argentina"),
        new Person(5, "Tom", "Brady", "Boston", "USA"),
        new Person(6, "Xi", "Yang", "Shanghai", "China"),
        new Person(7, "Bruno", "Garcia", "Rio de Janiero", "Brazil"),
        new Person(8, "Brad", "Haddin", "Melbourne", "Austrailia"),
        new Person(9, "Penelope", "Cruz", "Madrid", "Spain"),
        new Person(10, "Shigaru", "Miamoto", "Tokyo", "Japan")
    ]; 

    var params = {
        data: ko.observableArray(testData),
        pageSize: ko.observable(5)
    };

    var datagrid;

    beforeEach(function() {
        datagrid = new SimpleBootstrapDataGridViewModel(params);
    });
    
    it("current page is equal to 1 when the grid is first loaded", function() {        
        expect(datagrid.currentPage()).toEqual(1);
    });
    
    it("maxPages should be equal to 2 when first loaded", function() {
        expect(datagrid.maxPages()).toEqual(2);
    });

    it("start row should be 0 when first loaded", function() {
        expect(datagrid.startRow()).toEqual(0);
    });

    it("range should be 1...4,5,6...10 if there are 10 pages", function() {

        var params = {
            data: ko.observableArray(testData),
            pageSize: ko.observable(1)
        };

        var dg = new SimpleBootstrapDataGridViewModel(params);
        dg.gotoPage(5)
        var result = dg.dynamicPaginationRange();

        console.log(result);

        expect(result[0]).toEqual("1");
        expect(result[1]).toEqual("...");
        expect(result[2]).toEqual("4");
        expect(result[3]).toEqual("5");
        expect(result[4]).toEqual("6");
        expect(result[5]).toEqual("...");
        expect(result[6]).toEqual("10");
    });

    it("range should be 1,2,3...10 if current page is 1", function() {
        var params = {
            data: ko.observableArray(testData),
            pageSize: ko.observable(1)
        };

        var dg = new SimpleBootstrapDataGridViewModel(params);
        dg.gotoPage(5)
        var result = dg.dynamicPaginationRange();

        expect(result[0]).toEqual("1");
        expect(result[1]).toEqual("2");
        expect(result[2]).toEqual("3");
        expect(result[3]).toEqual("...");
        expect(result[4]).toEqual("10");
    });
})