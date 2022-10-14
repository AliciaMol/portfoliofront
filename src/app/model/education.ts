export interface Education {
    id?: number;
    person_id: number;
    title: String;
    career: String;
    faculty: String;
    house_of_studies: String;
    start_date: String;
    ending_date: String;
    logo_url: String;

    // constructor(person_id: number, title: String, career: String, faculty: String, house_of_studies: String, start_date: String, ending_date: String, logo_url: String){
    //     this.person_id=person_id;
    //     this.title=title;
    //     this.career=career;
    //     this.faculty=faculty;
    //     this.house_of_studies=house_of_studies;
    //     this.start_date=start_date;
    //     this.ending_date=ending_date;
    //     this.logo_url=logo_url;
    // }
}