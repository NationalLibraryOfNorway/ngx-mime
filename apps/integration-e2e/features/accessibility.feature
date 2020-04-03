@Accessibility
@android @iphone @desktop
Feature: Accessibility
  To have the same opportunity for use
  As a person with disabilities
  Then I want the viewer to be universally designed

  Background:
    Given the viewer is opened with a publication without attribution labels

  Scenario: Accessibility in dashboard view
    Given the viewer is in dashboard view
    Then the viewer should meet all accessibility criteria

