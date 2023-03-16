@view-swich
Feature: Page view
  In order to get a improved browsing experience
  As a user
  I want to see only the pages

  Background:
    Given the viewer is opened with a publication

  @android @iphone @desktop
  Scenario: Default view
    Then the viewer should be in page view

  @android @iphone @desktop
  Scenario: Navigate to page view
    Given the viewer is in dashboard view
    When the user click in the viewer
    Then the viewer should change to page view

  @android @iphone @desktop
  Scenario: Navigate to dashboard view
    Given the viewer is in page view
    When the user click in the viewer
    Then the viewer should change to dashboard view

  @ignore @android @iphone
  Scenario: Navigate to page view
    Given the viewer is in dashboard view
    When the user pinch out
    Then the viewer should change to page view

  @ignore @android @iphone
  Scenario: Navigate to dashboard view
    Given the viewer is in page view
    And the zoom level is home
    When the user pinch in
    Then the viewer should change to dashboard view

  @desktop
  Scenario: Close "Contents" dialog
    Given the viewer is in dashboard view
    And the viewer is in metadata view
    When the user click in the viewer
    Then the viewer should change to page view
    And the information dialog should be closed

  @desktop
  Scenario: Close "Search" dialog
    Given the viewer is in dashboard view
    And the search dialog is open
    When the user click in the viewer
    Then the viewer should change to page view
    And the Search dialog should be closed

  @desktop
  Scenario: Close "Help" dialog
    Given the viewer is in dashboard view
    And the help dialog is open
    When the user click in the viewer
    Then the viewer should change to page view
    And the Help dialog should be closed

  @desktop
  Scenario: Reopen "Contents" dialog
    Given the viewer is in dashboard view
    And the viewer is in metadata view
    When the user click in the viewer
    And the user click in the viewer
    Then the viewer should change to dashboard view
    And the information dialog should be open

  @desktop
  Scenario: Repoen "Search" dialog
    Given the viewer is in dashboard view
    And the search dialog is open
    When the user click in the viewer
    And the user click in the viewer
    Then the viewer should change to dashboard view
    And the Search dialog should be open

  @desktop
  Scenario: Repoen "Help" dialog
    Given the viewer is in dashboard view
    And the help dialog is open
    When the user click in the viewer
    And the user click in the viewer
    Then the viewer should change to dashboard view
    And the Help dialog should be open
