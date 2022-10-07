@android @iphone @desktop
Feature: Display help
  In order to navigate quickly
  As a user
  I want to be able to see information over all hotkeys

  Background:
    Given the viewer is opened with a publication

  Scenario: Show help
    Given the viewer is in dashboard view
    And the help dialog is open
    Then help is displayed to the user
