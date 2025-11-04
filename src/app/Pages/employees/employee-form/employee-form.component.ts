import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeService } from '../../../shared/employee.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  fb = inject(FormBuilder);
  employeeService = inject(EmployeeService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  isLoading = signal(false);
  errorMsg = signal('');
  isEditMode: boolean = false;
  employeeId: any;

  employeeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    department: ['', [Validators.required]],
    salary: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit() {
    this.employeeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isEditMode = this.employeeId ? true : false;

    if (this.isEditMode && this.employeeId) {
      this.isLoading.set(true);
      this.employeeService.getEmployeeById(+this.employeeId).subscribe({
        next: (employee) => {
          this.employeeForm.patchValue({
            name: employee.name,
            email: employee.email,
            department: employee.department,
            salary: employee.salary,
          });
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMsg.set('Error loading employee data');
          this.isLoading.set(false);
        },
      });
    }
  }
  onSubmit() {
  this.employeeForm.markAllAsTouched();
  if (this.employeeForm.invalid) {
    return;
  }

  this.isLoading.set(true);
  const safeEmployeeData = {
    name: this.employeeForm.value.name || '',
    email: this.employeeForm.value.email || '',
    department: this.employeeForm.value.department || '',
    salary: this.employeeForm.value.salary || 0
  };

  if (this.isEditMode && this.employeeId) {
    // Update existing employee
    const updatedEmployee = { id: +this.employeeId, ...safeEmployeeData };
    this.employeeService.updateEmployee(updatedEmployee).subscribe({
      next: () => {
        this.isLoading.set(false);
        Swal.fire('Employee updated successfully');
        this.router.navigate(['/dashboard/employees']);
        this.employeeForm.reset();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set('Error updating employee');
      },
    });
  } else {
    // Do not include id for new employee
    this.employeeService.addEmployee(safeEmployeeData).subscribe({
      next: () => {
        this.isLoading.set(false);
        Swal.fire('Employee created successfully');
        this.router.navigate(['/dashboard/employees']);
        this.employeeForm.reset();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set('Error creating employee');
      },
    });
  }
}

}
