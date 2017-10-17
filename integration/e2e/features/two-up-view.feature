Feature: Two-Up view
  In order to have a more authentic book reading experience
  As a user
  I want to be able to view two pages at the same time

  @desktop @android @iphone
  Scenario: Cover page should be presented by itself
    Given the viewer is opened with a publication with viewing hint "paged"
    Then only the cover page is displayed

  @desktop @android @iphone
  Scenario: Two-Up pages
    Given the viewer is opened with a publication with viewing hint "paged"
      And the user is on page 2
    Then page 2 and 3 are displayed

  @desktop @android @iphone
  Scenario: User select Two-Up mode
    Given the viewer is opened with a publication with viewing hint "paged"
      And the user is on page 2
    Then only page 2 is displayed
