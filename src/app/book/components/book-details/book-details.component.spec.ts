import {BookDetailsComponent} from './book-details.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Book} from '../../model/book';

describe('BookDetailsComponent', () => {
  let testBook: Book;

  beforeEach(() => {
    testBook = {
      id: 1, author: 'Test author', title: 'Test title'
    };
  });

  describe('(class tests)', () => {
    it('notifies on book change', (done) => {
      // given
      const eventMock = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: {
          querySelector(selector: string): any {
            return selector === '#author' ? {value: 'New author'} : {value: 'New title'};
          }
        }
      } as any;

      const component = new BookDetailsComponent();
      component.book = testBook;
      component.bookChange.subscribe(changedBook => {
        // then
        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect(changedBook).toBeDefined();
        expect(changedBook.id).toBe(1);
        expect(changedBook.author).toBe('New author');
        expect(changedBook.title).toBe('New title');
        done();
      });
      // when
      component.notifyOnBookChange(eventMock);
      console.log('End');
    });
  });

  describe('(DOM tests)', () => {
    let fixture: ComponentFixture<BookDetailsComponent>;
    let component: BookDetailsComponent;
    let element: HTMLElement;

    beforeEach(() => {
      return TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent<BookDetailsComponent>(BookDetailsComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });

    it('renders a book passed as input', () => {
      // given
      component.book = testBook;
      // when
      fixture.detectChanges();
      const titleInput = element.querySelector<HTMLInputElement>('input#title');
      const authorInput = element.querySelector<HTMLInputElement>('input#author');
      // then
      expect(titleInput.value).toBe(testBook.title);
      expect(authorInput.value).toBe(testBook.author);
    });

    it('notifies on book change after submit', () => {
      // given
      component.book = testBook;
      fixture.detectChanges();
      component.bookChange.subscribe(updatedBook => {
        // then
        expect(updatedBook.title).toBe('New title');
        expect(updatedBook.author).toBe(testBook.author);
      });
      // when
      const titleInput = element.querySelector<HTMLInputElement>('input#title');
      titleInput.value = 'New title';
      const button = element.querySelector<HTMLButtonElement>('button');
      button.click();
    });
  });
});
