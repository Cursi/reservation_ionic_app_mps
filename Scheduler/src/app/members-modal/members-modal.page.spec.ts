import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MembersModalPage } from './members-modal.page';

describe('MembersModalPage', () => {
  let component: MembersModalPage;
  let fixture: ComponentFixture<MembersModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MembersModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
