Feature: Page view
  In order to get a improved browsing experience
  As a user
  I want to see only the pages

  Background:
    Given the viewer is opened with a publication

  @mobile @desktop
  Scenario: Default view
    Then the viewer should be in page view

  @mobile @desktop
  Scenario: Navigate to page view
    Given the viewer is in dashboard view
    When the user click in the viewer
    Then the viewer should change to page view

  @mobile @desktop
  Scenario: Navigate to page view
    Given the viewer is in dashboard view
    When the user double click in the viewer
    Then the viewer should change to page view

  @mobile @desktop
  Scenario: Navigate to dashboard view
    Given the viewer is in page view
    When the user click in the viewer
    Then the viewer should change to dashboard view

  @Ignore
  @mobile
  Scenario: Navigate to page view
    Given the viewer is in dashboard view
    When the user pinch out
    Then the viewer should change to page view

  @Ignore
  @mobile
  Scenario: Navigate to dashboard view
    Given the viewer is in page view
    And zoom level is home
    When the user pinch in
    Then the viewer should change to dashboard view
