import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './probleme';
import { TypeproblemeService } from './typeprobleme.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})



export class ProblemeComponent implements OnInit {

  problemeForm!: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: any;
  constructor(private fb: FormBuilder,private typesDeProbleme : TypeproblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom: ['',[CaracteresValidator.longueurMinimum(3),Validators.required]],
      nom: ['',[Validators.maxLength(50),Validators.required]],
      noTypeProbleme: ['',[Validators.required]],
      notification: ['rien'],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
      descriptionProbleme : ["",[Validators.required,Validators.minLength(5)]],
      noUnite:"",
      dateProbleme : {value:Date(),disabled:true}
    });


    this.problemeForm.get('notification').valueChanges
    .subscribe(value => this.appliquerNotifications(value));
 
    this.typesDeProbleme.obtenirTypesProbleme()
    .subscribe(tp => this.typesProbleme = tp,
               error => this.errorMessage = <any>error);  

  }
  save(): void {
  }

  appliquerNotifications(typeNotification: string): void {
    const telephone = this.problemeForm.get('telephone');
    const courriel = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmation = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroup = this.problemeForm.get('courrielGroup');      

    // Tous remettre à zéro
    courriel.clearValidators();
    courriel.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courriel.disable();  

    courrielConfirmation.clearValidators();
    courrielConfirmation.reset();    
    courrielConfirmation.disable();

    telephone.clearValidators();
    telephone.reset();    
    telephone.disable();

    if (typeNotification === 'Courriel') {   
            courriel.setValidators([Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
            courriel.enable();  
            courrielConfirmation.setValidators([Validators.required]);              
            courrielConfirmation.enable();  
            // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
            // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
            courrielGroup.setValidators([Validators.compose([CaracteresValidator.longueurMinimum(3),emailMatcherValidator.courrielDifferents()])]); //ca cree le probleme                     
      }   
      else
      {
        if(typeNotification === 'Telephone')
        {
          telephone.setValidators([Validators.required,Validators.pattern('[0-9]+'),Validators.minLength(10),Validators.maxLength(10)]);  
          telephone.enable();  
        }
      }

      

    courriel.updateValueAndValidity();   
    courrielConfirmation.updateValueAndValidity();    
    telephone.updateValueAndValidity();  
  }

}
