@browse-in-dashboard-view
Feature: Browse in dashboard view
  In order to browse through a publication
  As a user
  I want to navigate between pages

  @ignore @android @iphone
  Scenario Outline: Swipe to navigate
    Given a <viewingDirection> publication with 10 pages
    And the viewer is in dashboard view
    And the user is on page <startPage>
    When the user swipe <swipeDirection> and the velocity is between <velocity>
    Then page <endPage> is displayed

    Examples:
      | viewingDirection | startPage | swipeDirection | velocity | endPage |
      | left-to-right    |         1 | left           |   50-100 |       2 |
      | left-to-right    |         1 | left           |  100-150 |       4 |
      | right-to-left    |         1 | rigth          |   50-100 |       2 |
      | right-to-left    |         1 | right          |  100-150 |       4 |
