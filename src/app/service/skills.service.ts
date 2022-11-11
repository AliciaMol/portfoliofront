import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Skill } from '../model/skill';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  /*Vammos a listar las funciones que necesito*/
  
  public getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiServerUrl}/skills/getall`);
  }

  /* addSkill*/
  public addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiServerUrl}/skills/add`, skill);
  }

  /*updateSkill*/
  public editSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiServerUrl}/skills/update`, skill);
  }
  
  /*deleteSkill*/
  public deleteSkill(skillId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/skills/delete/${skillId}`);
    
  }
}
