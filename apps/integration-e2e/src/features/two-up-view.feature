Feature: Two-Up view
  In order to have a more authentic book reading experience
  As a user
  I want to be able to view two pages at the same time

  @desktop @android @iphone
  Scenario: Cover page should be presented by itself
    Given the viewer is opened with a publication with viewing hint "paged"
    Then only the cover page is displayed

  @desktop
  Scenario: Two-Up pages desktop
    Given the viewer is opened with a publication with viewing hint "paged"
      And the user is on page 2
    Then page 2 and 3 are displayed

  @Ignore
  @android @iphone
  Scenario: Two-Up pages mobile
    Given the viewer is opened with a publication with viewing hint "paged"
      And the user is on page 2
    Then only page 2 is displayed

  @Ignore
  @android @iphone
  Scenario: User select Two-Up mode
    Given the viewer is opened with a publication with viewing hint "paged"
      And the layout is two-page
      And the user is on page 2
    Then page 2 and 3 are displayed

  @Ignore
  @desktop
  Scenario: User select One-page mode
    Given the viewer is opened with a publication with viewing hint "paged"
      And the viewer is in dashboard view
      And the layout is one-page
      And the user is on page 2
    Then only page 2 is displayed

  @desktop
  Scenario: Individuals books
    Given the viewer is opened with a publication with viewing hint "individuals"
      And the user is on page 2
    Then only page 2 is displayed

