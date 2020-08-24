@elements
Feature: Angular elements
  In order to use the viewer in a framework-agnostic way
  As a developer
  I want the viewer to be packaged as custom elements

  Scenario: Show viewer as custom elements
    When the viewer packed as custom elements is opened with a publication
    Then it should be displayed
