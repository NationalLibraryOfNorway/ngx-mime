@multiple-viewers
Feature: Multiple viewers
  In order to display multiple publications at the same time
  As a content creator
  I want to be able to add multiple viewers to the same page

  Scenario: Show multiple viewers in the same page
    Given it is two viewers on the same page
    Then the user should be able to navigate them individually
