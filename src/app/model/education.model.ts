export class education {
    id?: number;
    title: String;
    career: String;
    faculty: String;
    houseOfStudies: String;
    startDate: String;
    endingDate: String;
    imageURL: String;

    constructor(title: String, career: String, faculty: String, houseOfStudies: String, startDate: String, endingDate: String, imageURL: String){
        this.title=title;
        this.career=career;
        this.faculty=faculty;
        this.houseOfStudies=houseOfStudies;
        this.startDate=startDate;
        this.endingDate=endingDate;
        this.imageURL=imageURL;
    }
}