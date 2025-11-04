import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    private baseUrl = 'http://localhost:3000/employees';

  constructor(private http : HttpClient) { }

  getAllEmployees() : Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getEmployeeById(id: number) : Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }
  
  addEmployee(employee: Employee) : Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }
  updateEmployee(employee: Employee) : Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${employee.id}`, employee);
  }
  deleteEmployee(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
