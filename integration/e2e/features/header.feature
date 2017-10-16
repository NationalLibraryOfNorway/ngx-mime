Feature: Display header
  In order to give a great user experience
  As a viewer
  I want to give the user information about
  and tools for viewing an item

  Background:
    Given the viewer is opened with a publication

  Scenario: Display title
    Given the viewer is in dashboard view
    Then the label should be displayed
