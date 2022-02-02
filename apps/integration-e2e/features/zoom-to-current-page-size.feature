Feature: Fit current page size in view
  In order to see the pages good when I browse through a publication
  As a user
  I want the current page size to be fittet inside the view

  Background:
    Given the viewer is opened with a publication

  @android @iphone @desktop
  Scenario: Fit current page size in dashboard view
    Given the viewer is in dashboard view
    When the user navigates between the pages
    Then the current page size should be fittet inside the viewer
