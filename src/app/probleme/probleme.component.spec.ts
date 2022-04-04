import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it("#1 | Zone PRÉNOM invalide avec 2 caractèress", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(2));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBe(true);
    });

  it('#2 | Zone PRÉNOM valide avec 3 caractères',() => {
    let zone = component.problemeForm.controls['prenom']
    zone.setValue('a'.repeat(3));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBe(undefined);
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères ',() => {
    let zone = component.problemeForm.controls['prenom']
    zone.setValue('a'.repeat(200));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBe(undefined);
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur',() => {
    let zone = component.problemeForm.controls['prenom']
    zone.setValue('a'.repeat(0));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBe(true);
  });

  it('#5 | Zone PRÉNOM valide avec 10 espaces',() => {
    let zone = component.problemeForm.controls['prenom']
    zone.setValue(' '.repeat(10));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBe(true);
  });

  it('#6 | Zone PRÉNOM valide avec 2 espaces et 1 caractère',() => {
    let zone = component.problemeForm.controls['prenom']
    zone.setValue('  a'.repeat(1));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBe(true);
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier',() => {
    component.appliquerNotifications("Ne pas notifier");
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier',() => {
    component.appliquerNotifications("Ne pas notifier");

    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier',() => {
    component.appliquerNotifications("Ne pas notifier");
    let zone = component.problemeForm.get('courrielGroup.courriel');
    
    expect(zone.disabled).toBeTrue();
    
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier',() => {
    component.appliquerNotifications("Ne pas notifier");
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.disabled).toBeTrue();
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel',() => {
    component.appliquerNotifications("Courriel");
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel',() => {
    component.appliquerNotifications("Courriel");
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeFalse();
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel',() => {
    component.appliquerNotifications("Courriel");
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.disabled).toBeFalse();
  });






it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
  component.appliquerNotifications('Courriel');
  let errors = {};
  let courriel = component.problemeForm.get('courrielGroup.courriel');
  courriel.setValue('');
  errors = courriel.errors || {};
  expect(errors['required']).toBeTruthy();
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel',() => {
    component.appliquerNotifications("Courriel");
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('a'.repeat(0));
    expect(zone.valid).toBe(false);
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme',() => {
    component.appliquerNotifications("Courriel");
    let zone = component.problemeForm.get('courrielGroup.courriel')
    zone.setValue('kikos');
    expect(zone.valid).toBeFalse();
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {

    component.appliquerNotifications('Courriel');

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    let errors = {};

    zoneCourriel.setValue('');

    zoneCourrielConfirmation.setValue('aaa@asd.com');

    errors = groupe.errors || null;

    expect(errors).toBeNull();

    });
  

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null',() => {
    component.appliquerNotifications("Courriel");
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let groupe = component.problemeForm.get('courrielGroup');
    let errors = {};

    zone.setValue("johndoe@gmail.com");

    errors = groupe.errors || null;
    expect(errors).toBeNull();
    
  });

  
  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel',() => {
    component.appliquerNotifications("Courriel");
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');

    zone.setValue("kokiskag@gmail.com");
    zone2.setValue("klokiskag@gmail.com");
      //UTILISER METHODE DANS EMAIL MATCHER
    
    let errors = groupe.errors || null;
     expect(errors['match']).toBeTrue();
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel ',() => {
    component.appliquerNotifications("Courriel");
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zone.setValue("kokiskag@gmail.com");
    zone2.setValue("kokiskag@gmail.com");
      //UTILISER METHODE DANS EMAIL MATCHER
    let groupe = component.problemeForm.get('courrielGroup');
    let errors = groupe.errors || null;
     expect(errors).toBeNull();
  });


  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte',() => {
    component.appliquerNotifications("Telephone");
    let zone = component.problemeForm.get('telephone');

    expect(zone.enabled).toBeTrue();
  });

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte',() => {
    component.appliquerNotifications("Telephone");
    let zone = component.problemeForm.get('courrielGroup.courriel');

    expect(zone.disabled).toBeTrue();
  });
  
  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte',() => {
    component.appliquerNotifications("Telephone");
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');

    expect(zone.disabled).toBeTrue();
  });



  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte',() => {
    component.appliquerNotifications("Telephone");
    let zone = component.problemeForm.get('telephone');

    zone.setValue('');
    expect(zone.valid).toBeFalse();
  });


  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte',() => {
    component.appliquerNotifications("Telephone");
    let zone = component.problemeForm.get('telephone');

    zone.setValue('abcdefghij');
    expect(zone.valid).toBeFalse();
  });


  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte',() => {
    component.appliquerNotifications("Telephone");
    let zone = component.problemeForm.get('telephone');

    zone.setValue('111111111');
    expect(zone.valid).toBeFalse();
  });

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte',() => {
    component.appliquerNotifications("Telephone");
    let zone = component.problemeForm.get('telephone');

    zone.setValue('11111111111');
    expect(zone.valid).toBeFalse();
  });



  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte',() => {
    component.appliquerNotifications("Telephone");
    let zone = component.problemeForm.get('telephone');

    zone.setValue('1111111111');
    expect(zone.valid).toBeTrue();
  });
  
  
});
