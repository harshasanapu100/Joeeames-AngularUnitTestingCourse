import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component";

describe('HeroComponent (Shallow test)', () => {
    let fixture: ComponentFixture<HeroComponent>;
    let component: HeroComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
        component = fixture.componentInstance;
    });

    it('should have the correct hero', () => {
        //  Arrange
        component.hero = { id: 1, name: 'SuperDude', strength: 3 };

        // Assert
        expect(component.hero.name).toEqual('SuperDude');
    });

    it('should render hero name in an anchor tag', () => {
        //  Arrange
        component.hero = { id: 1, name: 'SuperDude', strength: 3 };

        // Act
        fixture.detectChanges();

        // Assert
        const de = fixture.debugElement.query(By.css('a'));
        expect(de.nativeElement.textContent).toContain('SuperDude');
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });
});