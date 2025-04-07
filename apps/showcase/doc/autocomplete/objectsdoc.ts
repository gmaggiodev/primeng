import { Code } from '@/domain/code';
import { CountryService } from '@/service/countryservice';
import { Component, OnInit } from '@angular/core';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-objects-demo',
    standalone: false,
    template: ` <app-docsectiontext>
            <p>
                AutoComplete can also work with objects using the <i>field</i> property that defines the label to display as a suggestion. The value passed to the model would still be the object instance of a suggestion. Here is an example with a
                Country object that has name and code fields such as <i>&#123;name: "United States", code:"USA"&#125;</i>.
            </p>
        </app-docsectiontext>

        <div class="card flex flex-col justify-center">
            <label for="countries">Select one or more countries</label>
            <p-autocomplete [(ngModel)]="selectedCountries" [suggestions]="filteredCountries" [multiple]="true" optionLabel="name" inputId="countries" (completeMethod)="filterCountry($event)" />
        </div>
        <div class="card flex flex-col justify-center">
            <label>Selection is:</label>
            <pre>
                {{ selectedCountries | json }}
            </pre
            >
        </div>
        <app-code [code]="code" selector="autocomplete-objects-demo"></app-code>`
})
export class ObjectsDoc implements OnInit {
    countries: any[] | undefined;

    selectedCountry: any;

    selectedCountries: any[] = [
        { code: 'AL', name: 'Albania' },
        { code: 'US', name: 'United States' },
        { code: 'RO', name: 'Romania' }
    ];

    filteredCountries: any[] | undefined;

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
            // Filter selected countries (ensure they are in the list)
            this.filteredCountries = countries.filter((country) => {
                return this.selectedCountries.includes(country.code);
            });
        });
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }

    code: Code = {
        basic: `<p-autocomplete [(ngModel)]="selectedCountries" [suggestions]="filteredCountries" [multiple]="true" optionLabel="name" inputId="countries" (completeMethod)="filterCountry($event)" />`,

        html: `<div class="card flex flex-col justify-center">
            <label for="countries">Select one or more countries</label>
            <p-autocomplete [(ngModel)]="selectedCountries" [suggestions]="filteredCountries" [multiple]="true" optionLabel="name" inputId="countries" (completeMethod)="filterCountry($event)" />
        </div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { CountryService } from '@/service/countryservice';
import { AutoComplete } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-objects-demo',
    templateUrl: './autocomplete-objects-demo.html',
    standalone: true,
    imports: [AutoComplete, FormsModule],
    providers: [CountryService]

})
export class AutocompleteObjectsDemo implements OnInit {
 countries: any[] | undefined;

    selectedCountry: any;

    selectedCountries: any[] = [
        { code: 'AL', name: 'Albania' },
        { code: 'US', name: 'United States' },
        { code: 'RO', name: 'Romania' }
    ];

    filteredCountries: any[] | undefined;

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
            // Filter selected countries (ensure they are in the list)
            this.filteredCountries = countries.filter((country) => {
                return this.selectedCountries.includes(country.code);
            });
        });
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}`,
        service: ['CountryService'],

        data: `
//CountryService
{
    "name": "Afghanistan",
    "code": "AF"
}
...`
    };
}
