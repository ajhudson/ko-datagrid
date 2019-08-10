function Person(id, firstName, lastName, city, country) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.country = country;
}

function ViewModel() {
    var people = ko.observableArray([
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
    ]);

    var columnNames = ["ID", "First Name", "Surname", "City", "Country"];

    var defaultPageSize = ko.observable(2);
    var pageSizeOptions = [];

    for (var i = 0; i < people().length; i++) {
        pageSizeOptions.push(i + 1);
    }

    return {
        data: people,
        columnNames: columnNames,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions
    }
}