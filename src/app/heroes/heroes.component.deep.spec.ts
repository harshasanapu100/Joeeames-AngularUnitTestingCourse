import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";
import { Directive, Input } from "@angular/core";

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('HeroesComponent (deep test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let component: HeroesComponent;
    let mockHeroService;
    let HEROES;

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
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
        });
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges();
    });

    it('should render each hero as HeroComponent', () => {
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toEqual(3);
        for (let i = 0; i < heroComponentDEs.length; i++) {
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    it('should call heroService.deleteHero when the Hero Component delete button is clicked', () => {
        // Arrange
        spyOn(component, 'delete');

        // Act
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponentDEs[1].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => { } });
        //other ways to call
        (<HeroComponent>heroComponentDEs[1].componentInstance).delete.emit(undefined);
        heroComponentDEs[1].triggerEventHandler('delete', null);

        // Assert
        expect(component.delete).toHaveBeenCalledWith(HEROES[1]);
    });

    it('should have the correct route for the first hero', () => {
        // Arrange
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        const routerLink = heroComponents[1].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

        // Act
        heroComponents[1].query(By.css('a')).triggerEventHandler('click', null);

        // Assert
        expect(routerLink.navigatedTo).toEqual('/detail/2');
    });
});