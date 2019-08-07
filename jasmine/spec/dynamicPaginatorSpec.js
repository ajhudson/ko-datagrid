describe("Dynamic Paginator", function() {

    fit("When on page 3 I expect pagination information to be generated correctly", function() {
        var dp = new DynamicPaginator(10, 3);
        var result = dp.getPaginatorInfo();
        
        expect(result).toBeDefined();
        expect(result).toEqual([1, 2, 3, 4, null, 10]);
    })

    it("When on page 5 I expect pagination information to be generated correctly", function() {
        var dp = new DynamicPaginator(10, 5);
        var result = dp.getPaginatorInfo();

        expect(result).toBeDefined();
        expect(result).toEqual([1, null, 4, 5, 6, null, 10]);
    });
})