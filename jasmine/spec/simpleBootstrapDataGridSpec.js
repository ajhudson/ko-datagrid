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
        new Person(10, "Shigaru", "Miamoto", "Tokyo", "Japan"),
        new Person(11, "Marcel", "Desailly", "Paris", "France"),
        new Person(12, "Eden", "Hazard", "Antwerp", "Belgium"),
        new Person(13, "David", "Beckham", "Miami", "USA"),
        new Person(14, "Igor", "Stimac", "Zagreb", "Croatia")
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
    
    it("maxPages should be equal to 3 when first loaded", function() {
        expect(datagrid.maxPages()).toEqual(3);
    });

    it("start row should be 0 when first loaded", function() {
        expect(datagrid.startRow()).toEqual(0);
    });
})