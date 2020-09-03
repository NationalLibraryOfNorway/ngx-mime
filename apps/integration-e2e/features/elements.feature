@elements
Feature: Angular elements
  In order to use the viewer in a framework-agnostic way
  As a developer
  I want the viewer to be packaged as custom elements

  Background:
    Given the viewer is packed as custom elements

  Scenario: Show viewer as custom elements in Angular
    When the viewer is opened with a publication in Angular
    Then it should be displayed

  Scenario: Show viewer as custom elements in HTML
    When the viewer is opened with a publication in HTML
    Then it should be displayed
