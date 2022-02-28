import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // Test 1
  it('Champ Prenom invalide avec 2 caracteres',() => {
    let zone = component.problemeForm.controls['Prenom']
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  // Test 2
  it('Champ Prenom valide avec 3 caracteres',() => {
    let zone = component.problemeForm.controls['Prenom']
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  // Test 3
  it('Champ Prenom valide avec 200 caracteres ',() => {
    let zone = component.problemeForm.controls['Prenom']
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  // Test 4
  it('Champ Prenom invalide avec aucune valeur',() => {
    let zone = component.problemeForm.controls['Prenom']
    zone.setValue('a'.repeat(0));
    expect(zone.valid).toBeFalsy();
  });

  // Test 5
  it('Champ Prenom valide avec 10 espaces',() => {
    let zone = component.problemeForm.controls['Prenom']
    zone.setValue(' '.repeat(10));
    expect(zone.valid).toBeTruthy();
  });

  // Test 6
  it('Champ Prenom valide avec 2 espaces et 1 caractere',() => {
    let zone = component.problemeForm.controls['Prenom']
    zone.setValue('  a'.repeat(1));
    expect(zone.valid).toBeTruthy();
  });
});
