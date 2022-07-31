import { Component, OnInit } from '@angular/core';
import { education } from 'src/app/model/education.model';
import { EducationService } from 'src/app/service/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  education: education = new education ("", "","", "","","", "");

  constructor(public educationService: EducationService) { }

  ngOnInit(): void {
    this.educationService.getEducation().subscribe(data => { this.education = data })
  }

}
