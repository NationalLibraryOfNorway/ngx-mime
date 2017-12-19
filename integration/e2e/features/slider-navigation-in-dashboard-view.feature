Feature: Navigation i dashboard view
  In order to start reading on a specific page
  As a user
  I want to jump to a specific page in a publication

  @desktop
  Scenario: Page slider navigation
    Given a left-to-right publication with 10 pages
      And the viewer is in dashboard view
      And the layout is two-page
    When the user drags the page slider to page 5
    Then page 5 is displayed

  @desktop
  Scenario: Page slider navigation
    Given a left-to-right publication with 10 pages
      And the viewer is in dashboard view
      And the layout is one-page
    When the user drags the page slider to page 5
    Then page 5 is displayed

  @android @iphone
  Scenario: Page slider navigation
    Given a left-to-right publication with 10 pages
      And the viewer is in dashboard view
      And the layout is one-page
    When the user drags the page slider to page 5
    Then page 5 is displayed

  @android @iphone
  Scenario: Page slider navigation
    Given a left-to-right publication with 10 pages
      And the viewer is in dashboard view
      And the layout is two-page
    When the user drags the page slider to page 5
    Then page 5 is displayed

  @desktop @android @iphone
  Scenario: Single Page dialog navigation
    Given a left-to-right publication with 10 pages
      And the viewer is in dashboard view
      And the layout is one-page
    When the user enters 5 in the page dialog
    Then page 5 is displayed

  @desktop @android @iphone
  Scenario: Two Page dialog navigation
    Given a left-to-right publication with 10 pages
      And the viewer is in dashboard view
      And the layout is two-page
    When the user enters 5 in the page dialog
    Then page 5 is displayed
