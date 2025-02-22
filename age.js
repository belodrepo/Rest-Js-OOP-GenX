class Age {
    constructor(bd) {
        this.birthdate = bd;
        this.today = new Date();
        this.birthday = new Date(this.birthdate);
    }

    getAge = () => this.today.getFullYear() - this.birthday.getFullYear();
}
class Generations extends Age {
    constructor(bd) {
        super(bd);
    }
    bd = this.birthday.getFullYear();
    gen = '';
getGeneration() {
        switch (true) {
            case this.bd >= 1946 && this.bd <= 1964:
                this.gen = 'Baby Boomer';
                break;
            case this.bd >= 1965 && this.bd <= 1980:
                this.gen = 'X generáció';
                break;
            case this.bd >= 1981 && this.bd <= 1996:
                this.gen = 'Y generáció';
                break;
            case this.bd >= 1997 && this.bd <= 2012:
                this.gen = 'Z generáció';
                break;
            case this.bd >= 2013 && this.bd <= 2024:
                this.gen = 'Alfa generáció';
                break;
            default:
                this.gen = 'veterán';
                

        }
        return this.gen;
    }
}


module.exports = { Generations };