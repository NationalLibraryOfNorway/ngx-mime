Feature: Fit current page size in view
  In order to see the page I'm reading optimally when I browse through a publication with varying page sizes
  As a user
  I want the current page to fill the view as the initial zoom

  Background:
    Given the viewer is opened with a publication

  @android @iphone @desktop
  Scenario: Fit current page size in dashboard view
    Given the viewer is in dashboard view
    When the user navigates between the pages
    Then the current page's size should be zoomed to fill the viewer
