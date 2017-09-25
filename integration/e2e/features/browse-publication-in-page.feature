Feature: Browse through a publication in page view
  In order to browse through a publication
  As a user
  I want to navigate between pages

  @Ignore
  @android @iphone
  Scenario Outline: Swipe to navigate
    Given a <viewingDirection> publication with 10 pages
    Given the viewer is in dashboard view
    And the user is on page <startPage>
    When the user click in the viewer
    When the user swipe <swipeDirection> and the velocity is equal or greater than 200
    Then the content of the page <endPage> is displayed

    Examples:
        | viewingDirection | startPage | swipeDirection | endPage |
        | left-to-right | 1  | left  | 2 |
        | left-to-right | 2  | right | 1 |
        | left-to-right | 1  | right | 1 |
        | left-to-right | 10 | left  | 10 |

  @Ignore
  @android @iphone
  Scenario Outline: Cancel swipe navigation
    Given a <viewingDirection> publication with 10 pages
    Given the viewer is in dashboard view
    And the user is on page <startPage>
    When the user click in the viewer
    When the user swipe <swipeDirection> but the velocity is less than 200
    Then the content of the page <endPage> is displayed

    Examples:
        | viewingDirection | startPage | swipeDirection | endPage |
        | left-to-right | 1 | left  | 1 |
        | left-to-right | 2 | right | 2 |

  @desktop
  Scenario Outline: Click to navigate
    Given a <viewingDirection> publication with 10 pages
    Given the viewer is in dashboard view
    And the user is on page <startPage>
    When the user click in the viewer
    Then the viewer should be in page view
    When the user click the <navigationButton> button
    Then the content of the page <endPage> is displayed

    Examples:
        | viewingDirection | startPage | navigationButton | endPage |
        | left-to-right | 1  | next     | 2 |
        | left-to-right | 2  | previous | 1 |
        | left-to-right | 1  | previous | 1 |
        | left-to-right | 10 | next     | 10 |