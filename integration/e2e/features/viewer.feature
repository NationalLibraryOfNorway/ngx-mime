@mobile @desktop
Feature: Open viewer
  In order to browse through a book
  As a user
  I want to see the viewer open a book correctly.

  Scenario: Open a book in the viewer
    Given I am opening a default book
    Then Viewer should be displayed
