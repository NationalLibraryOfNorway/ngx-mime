Feature: Slider navigation i dashboard view
  In order to start reading on a specific page
  As a user 
  I want to jump to a specific page in a publication

  @desktop @android @iphone
  Scenario: Page slider navigation 
    Given a left-to-right publication with 10 pages
      And the viewer is in dashboard view
    When the user drags the page slider to page 5
    Then the content of the page 5 is displayed