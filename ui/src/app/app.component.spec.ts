import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

jest.mock('../generated/Grpc_templateServiceClientPb');

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  function bootstrap() {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();    
    tick();
    return fixture;
  }

  it('should create the app', fakeAsync(() => {
    const fixture = bootstrap();
    expect(fixture.debugElement).toMatchSnapshot();
  }));
});
