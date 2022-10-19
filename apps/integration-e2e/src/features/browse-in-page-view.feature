@browse-in-page-view
Feature: Browse in page view
  In order to browse through a publication
  As a user
  I want to navigate between pages

  @ignore @android @iphone
  Scenario Outline: Swipe to navigate
    Given a <viewingDirection> publication with 10 pages
    And the zoom level is home
    And the user is on page <startPage>
    When the user swipe <swipeDirection> and the velocity is equal or greater than 200
    Then page <endPage> is displayed

    Examples:
      | viewingDirection | startPage | swipeDirection | endPage |
      | left-to-right    |         1 | left           |       2 |
      | left-to-right    |         2 | right          |       1 |
      | left-to-right    |         1 | right          |       1 |
      | left-to-right    |        10 | left           |      10 |
      | right-to-left    |         1 | right          |       2 |
      | right-to-left    |         2 | left           |       1 |
      | right-to-left    |         1 | left           |       1 |
      | right-to-left    |        10 | right          |      10 |

  @ignore @android @iphone
  Scenario Outline: Cancel swipe navigation
    Given a "<viewingDirection>" publication with 10 pages
    And the zoom level is home
    And the user is on page <startPage>
    When the user swipe <swipeDirection> but the velocity is less than 200
    Then page <endPage> is displayed

    Examples:
      | viewingDirection | startPage | swipeDirection | endPage |
      | left-to-right    |         1 | left           |       1 |
      | left-to-right    |         2 | right          |       2 |
      | right-to-left    |         1 | right          |       1 |
      | right-to-left    |         2 | left           |       2 |

  @desktop
  Scenario Outline: Click to navigate
    Given a <viewingDirection> publication with 10 pages
    And the user is on page <startPage>
    When the user click the <navigationButton> button
    Then page <endPage> is displayed

    Examples:
      | viewingDirection | startPage | navigationButton | endPage |
      | left-to-right    |         1 | next             |       2 |
      | left-to-right    |         2 | previous         |       1 |
      | left-to-right    |         1 | previous         |       1 |
      | left-to-right    |        10 | next             |      10 |
      | right-to-left    |         1 | next             |       2 |
      | right-to-left    |         2 | previous         |       1 |
      | right-to-left    |         1 | previous         |       1 |
      | right-to-left    |        10 | next             |      10 |
