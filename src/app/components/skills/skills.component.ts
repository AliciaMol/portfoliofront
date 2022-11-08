import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Skill } from '../../model/skill';
import { SkillsService } from '../../service/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  public skills: Skill[] = [];
  public editSkill: Skill | undefined;
  public deleteSkill: Skill | undefined;
  // public type =this.skills[2];

  constructor(private skillService: SkillsService) { }

  ngOnInit(): void {
    this.getSkills();
    console.log(this.skills);
  }

  /*GET ALL SKILLS */
  public getSkills(): void {
    this.skillService.getAllSkills().subscribe({
      next: (response: Skill[]) => {
        this.skills = response;
        console.log(this.skills);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  /**ADD SKILL */
  public onAddSkill(addForm: NgForm): void {
    document.getElementById('add-skill-form')?.click();
    this.skillService.addSkill(addForm.value).subscribe({
      next: (response: Skill) => {
        console.log(response);
        this.getSkills();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        /*limpiamos el form */
        addForm.reset();
      },
    });
  }

  /**EDIT SKILL */
  public onUpdateSkill(skill: Skill): void {
    this.skillService.editSkill(skill).subscribe({
      next: (response: Skill) => {
        console.log(response);
        this.getSkills();
      },
      /*En caso de que se produzca un error, que será del tipo HttpErrorResponse, se va a mostrar una alerta, vamos a acceder al mensaje del error. Se puede hacer aquí una notificación y hacer un manejo del error... etc. */
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
    console.log("onUpdate");
    console.log(skill);
  }

  /**DELETE SKILL */
  /*Recibe como parámetro el id de una skill.*/
  public onDeleteSkill(skill_Id: number): void {
    this.skillService.deleteSkill(skill_Id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getSkills();
      },
      /*En caso de que se produzca un error, que será del tipo HttpErrorResponse, se va a mostrar una alerta, vamos a acceder al mensaje del error. */
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal(mode: string, skill: Skill | undefined): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSkillModal');
    }
    if (mode === 'edit') {
      this.editSkill = skill;
      button.setAttribute('data-target', '#updateSkillModal');
    }
    if (mode === 'delete') {
      this.deleteSkill = skill;
      button.setAttribute('data-target', '#deleteSkillModal');
    }
    container!.appendChild(button);
    button.click();
  }

}
