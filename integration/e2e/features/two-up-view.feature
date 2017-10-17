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
    Then page 2 should be on the left side
      And page 3 should be on the right side

  @desktop @android @iphone
  Scenario: User select Two-Up mode
    Given the viewer is opened with a publication with viewing hint "individuals"
      And the user is on page 1
    When the user select "Two-Up" mode
    Then page 1 should be on the left side
      And page 2 should be on the right side
