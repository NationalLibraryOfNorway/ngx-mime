@navigation-in-dashboard-view
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
      | viewingDirection | layout   |
      | left-to-right    | two-page |
      | left-to-right    | one-page |
      | right-to-left    | two-page |
      | right-to-left    | one-page |

  @desktop @android @iphone
  Scenario Outline: Dialog navigation
    Given a <viewingDirection> publication with 10 pages
    And the layout is <layout>
    And the viewer is in dashboard view
    When the user enters 5 in the page dialog
    Then page 5 is displayed

    Examples:
      | viewingDirection | layout   |
      | left-to-right    | two-page |
      | left-to-right    | one-page |
      | right-to-left    | two-page |
      | right-to-left    | one-page |
