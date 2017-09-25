Feature: Browse through a publication in dashboard view
  In order to browse through a publication
  As a user
  I want to navigate between pages

  @Ignore
  @android @iphone
  Scenario Outline: Swipe to navigate
    Given a <viewingDirection> publication with 10 pages
      And the viewer is in dashboard view
      And the user is on page <startPage>
    When the user swipe <swipeDirection> and the velocity is between <velocity>
    Then the content of the page <endPage> is displayed

    Examples:
        | viewingDirection | startPage | swipeDirection | velocity | endPage |
        |  left-to-right   |  1  |  left | 50-100 |  2  |
        |  left-to-right   |  1  |  left | 100-150 |  4  |
