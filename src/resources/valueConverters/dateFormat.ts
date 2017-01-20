
export class DateFormatValueConverter {
    toView(value) {
        let date = new Date(value);
        let year = date.getFullYear();
        let month = this.getNumber(date.getMonth() + 1);
        let day = this.getNumber(date.getDate());
        return `${year}-${month}-${day}`;
    }

    getNumber(number){
        return ("0" + number).slice(-2);
    }
}