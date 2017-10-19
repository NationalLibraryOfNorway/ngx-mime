@android @iphone @desktop
Feature: Displaying logo
  In order to strengthen my brand identity
  As a individual or organization associated with the resource
  I want my logo to be clearly rendered when the resource is displayed or used

  Background:
    Given the viewer is opened with a publication

  Scenario: Show descriptive metadata
    Given the viewer is in dashboard view
      And the viewer is in metadata view
    Then the logo associated with the resource are displayed to the user
