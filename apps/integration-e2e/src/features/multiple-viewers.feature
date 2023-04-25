@multiple-viewers
Feature: Multiple viewers
  As a content creator,
  I want to display multiple publications simultaneously,
  So that users can access them conveniently.

  Scenario: Show Multiple Viewers on a Single Page
    Given there are two viewers displayed on the same page
    When the user navigates through the viewers
    Then each viewer should display its content individually
