import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/model/education';
import { EducationService } from 'src/app/service/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  public educations: Education[] = [];

  constructor(public educationService: EducationService) { }

  ngOnInit() {
    this.getEducations();
    console.log(this.educations);
  }

  /*GET ALL */
  
  public getEducations(): void {
    
    
    this.educationService.getEducations().subscribe({
      
      next: (response: Education[]) => {
        this.educations = response;
        console.log(this.educations);
      },
      
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}
