import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRankingComponent } from './project-ranking.component';

describe('ProjectRankingComponent', () => {
  let component: ProjectRankingComponent;
  let fixture: ComponentFixture<ProjectRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectRankingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
