Feature: Navigation i dashboard view
  In order to start reading on a specific page
  As a user
  I want to jump to a specific page in a publication

  @desktop @android @iphone
  Scenario Outline: Page slider navigation
    Given a <viewingDirection> publication with 10 pages
    And the layout is <layout>
    And the viewer is in dashboard view
    When the user drags the page slider to page 5
    Then page 5 is displayed

    Examples:
        | viewingDirection | layout |
        | right-to-left | two-page |
