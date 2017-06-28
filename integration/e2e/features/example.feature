Feature: Left to right books
  In order to browse through a book which are written from left to right 
  As a user
  I want to be able to see pages from a left to right book correctly presented.

  Background: Open a left to right book in the viewer 
    Given I am opening a book which are written from left to right

  Scenario: As a developer I want to be greeted
    Then it should display "mime works!"