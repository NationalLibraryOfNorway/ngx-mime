Feature: Viewing publications in fullscreen mode
  In order to view high quality images in great detail
  As a user
  I want the viewer to be presented using the entire screen

  Background:
    Given the viewer is opened with a publication

  @android @desktop
  Scenario: Fullscreen mode
    Given the viewer is in dashboard view
    When the user select full screen mode
    Then the viewer should be presented using the entire screen

  @android @desktop
  Scenario: Exit Fullscreen mode
    Given the viewer is in dashboard view
    Given the viewer is in full screen mode
    When the user select exit full screen mode
    Then the viewer should be presented normally
