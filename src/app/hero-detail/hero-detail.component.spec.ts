import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let component: HeroDetailComponent;
    let mockActivatedRoute;
    let mockLocation;
    let mockHeroService;

    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: () => {
                        return '3';
                    }
                }
            }
        }
        mockLocation = jasmine.createSpyObj(['back'])
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Location, useValue: mockLocation },
                { provide: HeroService, useValue: mockHeroService },
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);
        component = fixture.componentInstance;

        mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100 }))
        fixture.detectChanges();
    });

    it('should render hero name in a h2 tag', () => {
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    });

    it('should call updateHero when save is called (using done)', (done) => {
        // Arrange
        mockHeroService.updateHero.and.returnValue(of({}));

        // Act
        component.save();

        // Assert
        setTimeout(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
            done();
        }, 500)
    });

    it('should call updateHero when save is called (using fakeAsync)', fakeAsync(() => {
        // Arrange
        mockHeroService.updateHero.and.returnValue(of({}));

        // Act
        component.save();

        // Assert
        flush();
        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }));

    it('should call updateHero when save is called (using waitForAsync for promise)', waitForAsync(() => {
        // Arrange
        mockHeroService.updateHero.and.returnValue(of({}));

        // Act
        component.saveForPromise();

        // Assert
        fixture.whenStable().then(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
        })
    }));
});