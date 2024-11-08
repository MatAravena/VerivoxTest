import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLink } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title "Verivox code test"', () => {
    expect(component.title).toEqual('Verivox code test');
  });

  it('should render title in a paragraph', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Verivox code test 🎉');
  });

  it('should render the Verivox logo image', () => {
    const logo = fixture.debugElement.query(By.css('.left-side img'));
    expect(logo).toBeTruthy();
    expect(logo.nativeElement.getAttribute('src')).toContain('https://static.verivox.de/assets/images/navigational-elements/logo/logo-a2793f0bf4.svg');
  });

  it('should have a separator with the class "divider"', () => {
    const divider = fixture.debugElement.query(By.css('.divider'));
    expect(divider).toBeTruthy();
  });

  it('should have links in the pill group', () => {
    const pillLinks = fixture.debugElement.queryAll(By.css('.pill-group .pill'));
    expect(pillLinks.length).toBeGreaterThan(0);
    expect(pillLinks[0].nativeElement.textContent).toContain('List of Tariffs');
    expect(pillLinks[1].nativeElement.textContent).toContain('Compare Tariffs');
  });

  it('should navigate correctly with routerLink', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(links.length).toBe(2);

    const compareLink = links[1].nativeElement.getAttribute('ng-reflect-router-link');
    const listLink = links[0].nativeElement.getAttribute('ng-reflect-router-link');

    expect(compareLink).toBe('/compare');
    expect(listLink).toBe('/list');
  });

  it('should have social media links', () => {
    const socialLinks = fixture.debugElement.queryAll(By.css('.social-links a'));
    expect(socialLinks.length).toBe(2);

    const githubLink = socialLinks[0].nativeElement.getAttribute('href');
    const personalLink = socialLinks[1].nativeElement.getAttribute('href');

    expect(githubLink).toBe('https://github.com/MatAravena');
    expect(personalLink).toBe('https://mataravena.github.io');
  });
});