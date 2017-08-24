Feature: Open viewer
  In order to browse through a book
  As a user
  I want to see the viewer open a book correctly.

  Scenario: Open a book in the viewer
    Given the viewer is opened with a publication
    Then the viewer should be displayed
