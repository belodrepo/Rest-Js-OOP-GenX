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
    birthyear = this.birthday.getFullYear();
    generation = '';
getGeneration() {
        switch (true) {
            case this.birthyear >= 1946 && this.birthyear <= 1964:
                this.generation = 'Baby Boomer';
                break;
            case this.birthyear >= 1965 && this.birthyear <= 1980:
                this.generation = 'X generáció';
                break;
            case this.birthyear >= 1981 && this.birthyear <= 1996:
                this.generation = 'Y generáció';
                break;
            case this.birthyear >= 1997 && this.birthyear <= 2012:
                this.generation = 'Z generáció';
                break;
            case this.birthyear >= 2013 && this.birthyear <= 2024:
                this.generation = 'Alfa generáció';
                break;
            default:
                this.generation = 'veterán';
                

        }
        return this.generation;
    }
}


module.exports = { Generations };