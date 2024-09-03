import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { parse } from 'papaparse';

@Component({
  selector: 'app-project-ranking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-ranking.component.html',
  styleUrls: ['./project-ranking.component.css']
})
export class ProjectRankingComponent {
  projects: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  topX: number = 5;
  file: File | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.readCSV(this.file);
    }
  }

  readCSV(file: File) {
    parse(file, {
      header: true,
      complete: (result) => {
        const data = result.data as any[];
        this.projects = data;
        this.extractCategories(data);
        // Después de procesar el CSV, sube los datos y obtén el ranking
        this.uploadData();
      },
      error: (error) => {
        console.error('Error al leer el archivo CSV', error);
      }
    });
  }

  extractCategories(data: any[]) {
    const categoriesSet = new Set<string>();
    data.forEach(item => {
      if (item.category) {
        categoriesSet.add(item.category);
      }
    });
    this.categories = Array.from(categoriesSet);
  }

  uploadData() {
    if (this.selectedCategory && this.projects.length > 0 && this.file) {
      const formData = new FormData();
      formData.append('file', this.file); // Append the file to FormData
      formData.append('topX', this.topX.toString());
      formData.append('category', this.selectedCategory);

      this.http.post<any[]>('http://localhost:8080/projects/upload', formData)
        .subscribe(
          (data) => {
            this.projects = data; // Update projects with the data from backend
          },
          (error) => {
            console.error('Error al enviar los datos al backend', error);
          }
        );
    } else {
      console.warn('Category, projects, or file is missing');
    }
  }
}
