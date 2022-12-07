
const Strings = artifacts.require("Strings");

contract("Strings", () => {
    let strings = null;
    
    before(async() => {
        strings = await Strings.deployed();
    })

    it ('Should return the lenght', async() =>{
        const length = await strings.getLength("abc");
        assert(length.toNumber() ===3);
    })

    it ('Should concatenate', async() =>{
        const concatenateString = await strings.concatenate("abc", "defg");
        assert(concatenateString === "abcdefg");
    })

})
