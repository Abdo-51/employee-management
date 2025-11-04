import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../shared/employee.service';
import { Employee } from '../../../models/Employee';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
private EmployeeService = inject(EmployeeService);

employees: Employee[] = [];

ngOnInit() {
  this.loadEmployees();
}

loadEmployees() {
  this.EmployeeService.getAllEmployees().subscribe((data: Employee[]) => {
    this.employees = data;
  });
}
deleteEmployee(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.EmployeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
        Swal.fire(
          'Deleted!',
          'Employee has been deleted.',
          'success'
        );
      });
    }
  });
}
 trackById( item: Employee) {
    return item.id;  
  }
}
