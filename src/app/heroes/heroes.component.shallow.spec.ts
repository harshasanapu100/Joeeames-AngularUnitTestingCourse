import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { Component, Input } from '@angular/core';
import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe('HeroesComponent (shallow test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let component: HeroesComponent;
    let mockHeroService;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: '<div></div>'
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
    }

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'SuperDude', strength: 55 },
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ]
        });
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
    });

    it('should set heroes correctly from the service', () => {
        // Arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // Act
        fixture.detectChanges();

        // Assert
        expect(component.heroes.length).toEqual(3);
    });

    it('should create one li for each element', () => {
        // Arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // Act
        fixture.detectChanges();

        // Assert
        expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(3);
    });
});