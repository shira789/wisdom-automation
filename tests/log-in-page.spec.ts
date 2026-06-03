import { test } from '@playwright/test';

test.describe('Log In Page', () => {
  test.describe('Home Page', () => {
    test.describe('News Feed Module', () => {
      test('when hovering on a white entity should be written "unread", async ({ page }) => {
        // @unittcms:caseId:17
        // TODO: implement
      });

      test('when clicking on entity it should be colored grey as readed, async ({ page }) => {
        // @unittcms:caseId:10
        // TODO: implement
      });

      test('when hovering on a grey entity should be written "read", async ({ page }) => {
        // @unittcms:caseId:16
        // TODO: implement
      });

      test('clicking on entity\'s star will color it yellow, async ({ page }) => {
        // @unittcms:caseId:4
        // TODO: implement
      });

      test('clicking on X button delete the entity from the list, async ({ page }) => {
        // @unittcms:caseId:3
        // TODO: implement
      });

      test.describe('Rules', () => {

      });

      test.describe('Filter', () => {
        test('filtering by entity type will display only the selected entity type, async ({ page }) => {
          // @unittcms:caseId:20
          // TODO: implement
        });

        test('when filtering on multiple entity types all the option will be displayed, async ({ page }) => {
          // @unittcms:caseId:21
          // TODO: implement
        });

        test('when removing one entity type from the filter in will be removed from the entities list, async ({ page }) => {
          // @unittcms:caseId:22
          // TODO: implement
        });

      });

      test.describe('Favorite', () => {
        test('clicking on the star button will display all the favorite entities, async ({ page }) => {
          // @unittcms:caseId:5
          // TODO: implement
        });

        test('entities order will be from last marked to the first, async ({ page }) => {
          // @unittcms:caseId:6
          // TODO: implement
        });

      });

      test.describe('Search', () => {
        test('search request will be sent over 2 written chars, async ({ page }) => {
          // @unittcms:caseId:8
          // Pre-conditions: cases :
- under two chars no search request 
- from two chars and up search request will be sent
          // TODO: implement
        });

        test('search request will return results as full test search, async ({ page }) => {
          // @unittcms:caseId:9
          // TODO: implement
        });

        test('search will return top 30 matching results, async ({ page }) => {
          // @unittcms:caseId:7
          // TODO: implement
        });

      });

      test.describe('Read / Unread Filter Button', () => {
        test('when filtering on unread should display unread entities, async ({ page }) => {
          // @unittcms:caseId:11
          // TODO: implement
        });

        test('when filtering on read should display the all the read entities, async ({ page }) => {
          // @unittcms:caseId:12
          // TODO: implement
        });

        test('clicking twice on the button will return display both types of entities, async ({ page }) => {
          // @unittcms:caseId:18
          // TODO: implement
        });

        test('one click on "Read/Unread" button should display all the unread entities in the news feed, async ({ page }) => {
          // @unittcms:caseId:15
          // TODO: implement
        });

        test('when filtering on unread and making one entity as "read" the entity should be removed from the results and displayed in the "read" list, async ({ page }) => {
          // @unittcms:caseId:13
          // TODO: implement
        });

        test('clicking twice on the button will display "read and unread - all" in hover, async ({ page }) => {
          // @unittcms:caseId:19
          // TODO: implement
        });

        test('when filtering on read and making one entity as "unread" the entity should be removed from the results and displayed in the "unread" list, async ({ page }) => {
          // @unittcms:caseId:14
          // TODO: implement
        });

      });

    });

    test.describe('Quick Tree Display Module', () => {

    });

    test.describe('Favorites Inferences Module', () => {

    });

  });

  test.describe('Top Toolbar Module', () => {
    test.describe('Create Button', () => {

    });

  });
});
